-- ============================================================
-- LOCALPRO — USER SCHEMA
-- MVP Phase 1 | Delhi NCR | Home Services + Tutoring
-- Aligned to BRD v1.0 + PRD v1.0 | March 2026
-- Database: PostgreSQL (Supabase)
-- ============================================================
-- TABLE OVERVIEW
--
--   users                 Common identity for all user types
--   consumer_profiles     Extended data for CONSUMER role
--   provider_profiles     Extended data for PROVIDER role (both Individual + Agency)
--   agency_staff          Staff members under an agency provider
--   admin_profiles        Extended data for ADMIN role
--
-- DESIGN NOTES
--   - users is the single source of truth for auth and identity
--   - firebase_uid is the bridge between Firebase Auth and Postgres
--   - Role-specific data lives in separate profile tables (1:1 with users)
--   - Agency is not a separate role — it is an account_type on provider_profiles
--   - Staff members have NO login — they are data rows under a provider
--   - All monetary values stored in paise (INR × 100) as integers
--   - All timestamps stored as TIMESTAMPTZ (UTC)
-- ============================================================


-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM (
    'CONSUMER',     -- General public, browses and submits inquiries
    'PROVIDER',     -- Individual or agency service provider
    'ADMIN'         -- Internal platform operator (manual DB assignment only)
);

CREATE TYPE account_type AS ENUM (
    'INDIVIDUAL',   -- Single provider under their own name
    'AGENCY'        -- Business with multiple staff under a branded profile
);

CREATE TYPE subscription_tier AS ENUM (
    'FREE',         -- Basic listing, WhatsApp only, no portfolio
    'STANDARD',     -- Portfolio, reviews, phone visible, booking fee option
    'PRO',          -- All Standard + analytics, featured badge
    'AGENCY'        -- All Pro + staff profiles, branded agency page (agencies only)
);

CREATE TYPE subscription_status AS ENUM (
    'ACTIVE',       -- Subscription is current and paid
    'GRACE',        -- Payment failed, within 7-day grace period
    'INACTIVE'      -- Grace period expired or cancelled, downgraded to FREE
);

CREATE TYPE billing_cycle AS ENUM (
    'MONTHLY',
    'ANNUAL'
);

CREATE TYPE vertical AS ENUM (
    'HOME',         -- Home Services (electricians, plumbers, cleaners, etc.)
    'TUTOR'         -- Tutoring & Education (maths, science, music, etc.)
);

CREATE TYPE availability_status AS ENUM (
    'AVAILABLE',    -- Currently taking new inquiries
    'BUSY',         -- Temporarily not taking new inquiries
    'INACTIVE'      -- Profile hidden from search
);

CREATE TYPE provider_status AS ENUM (
    'PENDING',      -- Registered, awaiting admin approval
    'ACTIVE',       -- Approved and visible in public search
    'SUSPENDED',    -- Temporarily suspended by admin
    'REMOVED'       -- Permanently removed from platform
);

CREATE TYPE verification_status AS ENUM (
    'NOT_APPLIED',  -- Has not applied for verified badge
    'PENDING',      -- Application submitted, under admin review
    'VERIFIED',     -- Admin approved, badge shown on profile
    'REJECTED'      -- Admin rejected the application
);


-- ============================================================
-- 1. USERS
--    Common identity table for ALL user types.
--    Every Consumer, Provider, and Admin has exactly one row here.
-- ============================================================

CREATE TABLE users (
    -- Identity
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid        TEXT            NOT NULL UNIQUE,   -- Firebase Auth UID, bridge between Auth and Postgres

    -- Role
    role                user_role       NOT NULL,          -- CONSUMER | PROVIDER | ADMIN

    -- Basic info (collected at registration)
    name                TEXT            NOT NULL,
    mobile              TEXT,                              -- Collected via OTP flow; optional if Google OAuth used
    email               TEXT,                              -- Optional for OTP users; required for Google OAuth users
    avatar_url          TEXT,                              -- Cloudinary URL; nullable until set

    -- Timestamps
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    last_login_at       TIMESTAMPTZ,

    -- Soft delete
    is_deleted          BOOLEAN         NOT NULL DEFAULT FALSE,
    deleted_at          TIMESTAMPTZ,

    -- Constraints
    CONSTRAINT users_mobile_or_email CHECK (
        mobile IS NOT NULL OR email IS NOT NULL
    )
);

-- Indexes
CREATE INDEX idx_users_firebase_uid     ON users (firebase_uid);
CREATE INDEX idx_users_role             ON users (role);
CREATE INDEX idx_users_email            ON users (email) WHERE email IS NOT NULL;
CREATE INDEX idx_users_mobile           ON users (mobile) WHERE mobile IS NOT NULL;

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE users IS 'Single identity table for all user types. Every Consumer, Provider, and Admin has one row here. Role-specific data lives in separate profile tables.';
COMMENT ON COLUMN users.firebase_uid IS 'Firebase Auth UID. Synced on first login. Used to verify ID tokens server-side via firebase-admin.';
COMMENT ON COLUMN users.role IS 'Assigned at registration. ADMIN is set manually in DB only — no self-serve path.';
COMMENT ON COLUMN users.mobile IS 'Captured via Firebase OTP flow. May be null for pure Google OAuth users.';


-- ============================================================
-- 2. CONSUMER PROFILES
--    One row per CONSUMER user.
--    Created automatically on first login for CONSUMER role.
-- ============================================================

CREATE TABLE consumer_profiles (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID            NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,

    -- Preferences (optional, for future personalisation)
    preferred_localities TEXT[],        -- Delhi NCR localities the consumer searches most
    saved_provider_ids  UUID[],         -- Providers saved/bookmarked by consumer

    -- Timestamps
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_consumer_profiles_user_id ON consumer_profiles (user_id);

CREATE TRIGGER trg_consumer_profiles_updated_at
    BEFORE UPDATE ON consumer_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE consumer_profiles IS 'Extended profile data for CONSUMER role users. Created on first login. Inquiry and review history is stored in their respective tables (inquiries, reviews) linked via user_id.';


-- ============================================================
-- 3. PROVIDER PROFILES
--    One row per PROVIDER user (both Individual and Agency).
--    account_type column distinguishes Individual vs Agency.
--    Created during the multi-step onboarding flow.
-- ============================================================

CREATE TABLE provider_profiles (
    id                  UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID                NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,

    -- Account classification
    account_type        account_type        NOT NULL DEFAULT 'INDIVIDUAL',
    vertical            vertical            NOT NULL,          -- HOME or TUTOR

    -- Public profile fields
    display_name        TEXT                NOT NULL,
    slug                TEXT                NOT NULL UNIQUE,   -- SEO URL: /providers/[slug], auto-generated from name + locality
    tagline             TEXT,                                  -- Short one-liner shown on search cards (max 100 chars)
    bio                 TEXT,                                  -- Full description shown on profile page (max 500 chars)

    -- Service details
    service_area        TEXT[]              NOT NULL DEFAULT '{}',  -- Array of Delhi NCR locality names
    base_rate_min       INTEGER,                               -- Stored in paise (INR × 100), e.g. 50000 = ₹500
    base_rate_max       INTEGER,                               -- Stored in paise (INR × 100), e.g. 80000 = ₹800

    -- Availability
    availability_status availability_status NOT NULL DEFAULT 'AVAILABLE',

    -- Admin-controlled status
    provider_status     provider_status     NOT NULL DEFAULT 'PENDING',
    approved_at         TIMESTAMPTZ,
    approved_by         UUID                REFERENCES users (id),  -- Admin user who approved

    -- Verification badge
    verification_status verification_status NOT NULL DEFAULT 'NOT_APPLIED',
    verified_at         TIMESTAMPTZ,
    verified_by         UUID                REFERENCES users (id),  -- Admin user who granted badge

    -- Subscription
    subscription_tier   subscription_tier   NOT NULL DEFAULT 'FREE',

    -- Booking fee (Standard+ only)
    booking_fee_enabled BOOLEAN             NOT NULL DEFAULT FALSE,
    booking_fee_amount  INTEGER,            -- Fixed: 4900, 9900, or 14900 paise (₹49, ₹99, ₹149)

    -- Ratings (denormalised for fast search queries — recalculated on each new review)
    avg_rating          NUMERIC(3, 2)       DEFAULT NULL,      -- e.g. 4.75
    review_count        INTEGER             NOT NULL DEFAULT 0,

    -- Profile completeness (0–100, used for dashboard completion banner)
    completion_pct      INTEGER             NOT NULL DEFAULT 0
        CONSTRAINT chk_completion_pct CHECK (completion_pct BETWEEN 0 AND 100),

    -- Agency-specific (NULL for Individual accounts)
    agency_name         TEXT,              -- Trading name of the agency
    agency_logo_url     TEXT,              -- Cloudinary URL for agency logo
    agency_description  TEXT,             -- Extended agency description (max 1000 chars)

    -- Timestamps
    created_at          TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ        NOT NULL DEFAULT NOW(),

    -- Constraints
    CONSTRAINT chk_base_rate_range CHECK (
        base_rate_min IS NULL OR base_rate_max IS NULL OR base_rate_min <= base_rate_max
    ),
    CONSTRAINT chk_booking_fee_amount CHECK (
        booking_fee_amount IS NULL OR booking_fee_amount IN (4900, 9900, 14900)
    ),
    CONSTRAINT chk_agency_fields CHECK (
        account_type = 'INDIVIDUAL'
        OR (account_type = 'AGENCY' AND agency_name IS NOT NULL)
    ),
    CONSTRAINT chk_agency_tier CHECK (
        NOT (account_type = 'INDIVIDUAL' AND subscription_tier = 'AGENCY')
    )
);

-- Indexes for search and filtering
CREATE INDEX idx_provider_profiles_user_id          ON provider_profiles (user_id);
CREATE INDEX idx_provider_profiles_slug             ON provider_profiles (slug);
CREATE INDEX idx_provider_profiles_vertical         ON provider_profiles (vertical);
CREATE INDEX idx_provider_profiles_account_type     ON provider_profiles (account_type);
CREATE INDEX idx_provider_profiles_provider_status  ON provider_profiles (provider_status);
CREATE INDEX idx_provider_profiles_subscription     ON provider_profiles (subscription_tier);
CREATE INDEX idx_provider_profiles_availability     ON provider_profiles (availability_status);
CREATE INDEX idx_provider_profiles_avg_rating       ON provider_profiles (avg_rating DESC NULLS LAST);
CREATE INDEX idx_provider_profiles_service_area     ON provider_profiles USING GIN (service_area);

-- Full-text search index on name + tagline + bio
ALTER TABLE provider_profiles ADD COLUMN search_vector TSVECTOR;

CREATE INDEX idx_provider_profiles_search ON provider_profiles USING GIN (search_vector);

CREATE OR REPLACE FUNCTION update_provider_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector :=
        SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.display_name, '')), 'A') ||
        SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.tagline, '')),      'B') ||
        SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.bio, '')),          'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_provider_search_vector
    BEFORE INSERT OR UPDATE OF display_name, tagline, bio
    ON provider_profiles
    FOR EACH ROW EXECUTE FUNCTION update_provider_search_vector();

CREATE TRIGGER trg_provider_profiles_updated_at
    BEFORE UPDATE ON provider_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE provider_profiles IS 'Extended profile for PROVIDER role. Covers both Individual and Agency account types. account_type column is the discriminator — agency-specific columns are NULL for Individual accounts.';
COMMENT ON COLUMN provider_profiles.slug IS 'Auto-generated SEO-friendly URL slug. Format: {name}-{locality}. Example: ravi-sharma-dwarka. Must be unique across the platform.';
COMMENT ON COLUMN provider_profiles.base_rate_min IS 'Minimum hourly rate stored in paise (INR × 100). Display as ₹(value/100).';
COMMENT ON COLUMN provider_profiles.base_rate_max IS 'Maximum hourly rate stored in paise (INR × 100). Display as ₹(value/100).';
COMMENT ON COLUMN provider_profiles.booking_fee_amount IS 'Fixed options only: 4900 (₹49), 9900 (₹99), 14900 (₹149). NULL when booking fee disabled.';
COMMENT ON COLUMN provider_profiles.search_vector IS 'Auto-maintained tsvector for full-text search. Weighted: display_name (A) > tagline (B) > bio (C).';
COMMENT ON COLUMN provider_profiles.avg_rating IS 'Denormalised average rating. Recalculated and stored on every new review — not computed at query time.';


-- ============================================================
-- 4. AGENCY STAFF
--    Staff members listed under an agency provider profile.
--    These are NOT users — they have no login accounts.
--    Managed entirely by the agency account holder.
-- ============================================================

CREATE TABLE agency_staff (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_profile_id UUID            NOT NULL REFERENCES provider_profiles (id) ON DELETE CASCADE,

    -- Staff member details
    name                TEXT            NOT NULL,
    role_title          TEXT            NOT NULL,  -- e.g. "Lead Photographer", "Math Tutor", "Electrician"
    photo_url           TEXT,                      -- Cloudinary URL
    bio                 TEXT,                      -- Short bio shown on agency page (max 300 chars)
    display_order       INTEGER         NOT NULL DEFAULT 0,  -- Controls order on agency public page

    -- Timestamps
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    -- Max 10 staff per agency (enforced at application layer via feature gating)
    CONSTRAINT chk_role_title_length CHECK (char_length(role_title) <= 100),
    CONSTRAINT chk_bio_length        CHECK (bio IS NULL OR char_length(bio) <= 300)
);

CREATE INDEX idx_agency_staff_provider_id      ON agency_staff (provider_profile_id);
CREATE INDEX idx_agency_staff_display_order    ON agency_staff (provider_profile_id, display_order);

CREATE TRIGGER trg_agency_staff_updated_at
    BEFORE UPDATE ON agency_staff
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE agency_staff IS 'Staff members listed under an agency provider. Not users — no login, no Firebase UID. Managed by the agency account holder. Max 10 per agency enforced at application layer (feature gate for AGENCY tier).';


-- ============================================================
-- 5. ADMIN PROFILES
--    One row per ADMIN user.
--    Admins are created manually in the database — no self-serve.
-- ============================================================

CREATE TABLE admin_profiles (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID            NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,

    -- Admin metadata
    display_name        TEXT            NOT NULL,  -- Internal name shown in admin audit logs
    is_super_admin      BOOLEAN         NOT NULL DEFAULT FALSE,  -- Super admins can manage other admins

    -- Audit
    created_by          UUID            REFERENCES users (id),  -- Which admin created this admin account
    notes               TEXT,                                   -- Internal notes (e.g. "Operations team")

    -- Timestamps
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_profiles_user_id ON admin_profiles (user_id);

CREATE TRIGGER trg_admin_profiles_updated_at
    BEFORE UPDATE ON admin_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE admin_profiles IS 'Extended profile for ADMIN role. Admins are created manually in the DB — no self-registration path exists. is_super_admin flag allows managing other admin accounts.';


-- ============================================================
-- 6. PROVIDER VERIFICATION REQUESTS
--    Tracks the lifecycle of a verified badge application.
--    Standard+ providers can submit one request at a time.
-- ============================================================

CREATE TABLE verification_requests (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_profile_id UUID            NOT NULL REFERENCES provider_profiles (id) ON DELETE CASCADE,

    -- Request state
    status              verification_status NOT NULL DEFAULT 'PENDING',
    submitted_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    -- Admin review
    reviewed_by         UUID            REFERENCES users (id),
    reviewed_at         TIMESTAMPTZ,
    rejection_reason    TEXT,           -- Populated if status = REJECTED

    -- Timestamps
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    -- Only one active (PENDING) request per provider at a time
    CONSTRAINT uq_one_pending_per_provider UNIQUE (provider_profile_id, status)
        DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX idx_verification_requests_provider    ON verification_requests (provider_profile_id);
CREATE INDEX idx_verification_requests_status      ON verification_requests (status);

CREATE TRIGGER trg_verification_requests_updated_at
    BEFORE UPDATE ON verification_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE verification_requests IS 'Tracks verified badge applications from Standard+ providers. Admin reviews each request manually. Only one PENDING request per provider is allowed at a time.';


-- ============================================================
-- 7. SUBSCRIPTIONS
--    One active subscription row per provider.
--    razorpay_sub_id is nullable — Razorpay integration deferred.
--    Tier is managed manually until billing goes live.
-- ============================================================

CREATE TABLE subscriptions (
    id                      UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_profile_id     UUID                NOT NULL UNIQUE REFERENCES provider_profiles (id) ON DELETE CASCADE,

    -- Plan details
    tier                    subscription_tier   NOT NULL DEFAULT 'FREE',
    billing_cycle           billing_cycle,                  -- NULL for FREE tier
    status                  subscription_status NOT NULL DEFAULT 'ACTIVE',

    -- Billing period
    current_period_start    TIMESTAMPTZ,
    current_period_end      TIMESTAMPTZ,
    grace_period_end        TIMESTAMPTZ,        -- Set on payment failure: current_period_end + 7 days

    -- Razorpay (nullable — deferred until billing goes live)
    razorpay_sub_id         TEXT UNIQUE,        -- Razorpay subscription ID
    razorpay_plan_id        TEXT,               -- Razorpay plan ID

    -- Timestamps
    created_at              TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_provider    ON subscriptions (provider_profile_id);
CREATE INDEX idx_subscriptions_tier        ON subscriptions (tier);
CREATE INDEX idx_subscriptions_status      ON subscriptions (status);
CREATE INDEX idx_subscriptions_period_end  ON subscriptions (current_period_end) WHERE status IN ('ACTIVE', 'GRACE');

CREATE TRIGGER trg_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE subscriptions IS 'Tracks provider subscription state. razorpay_sub_id is nullable — Razorpay integration is deferred. During MVP testing, tier is set manually by admin. On payment failure, grace_period_end is set to current_period_end + 7 days; a daily cron downgrades to FREE after that.';


-- ============================================================
-- INITIAL DATA — AUTO-CREATE FREE SUBSCRIPTION ON PROVIDER
-- PROFILE CREATION
-- ============================================================

CREATE OR REPLACE FUNCTION create_free_subscription()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO subscriptions (provider_profile_id, tier, status)
    VALUES (NEW.id, 'FREE', 'ACTIVE');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auto_create_subscription
    AFTER INSERT ON provider_profiles
    FOR EACH ROW EXECUTE FUNCTION create_free_subscription();

COMMENT ON FUNCTION create_free_subscription IS 'Automatically creates a FREE tier subscription row whenever a new provider profile is created. Ensures every provider always has a subscription record.';


-- ============================================================
-- VIEWS
-- ============================================================

-- Convenience view: full user + role-specific profile in one query
CREATE VIEW v_providers AS
SELECT
    u.id                    AS user_id,
    u.firebase_uid,
    u.name                  AS user_name,
    u.email,
    u.mobile,
    u.avatar_url,
    u.created_at            AS user_created_at,

    pp.id                   AS provider_profile_id,
    pp.account_type,
    pp.vertical,
    pp.display_name,
    pp.slug,
    pp.tagline,
    pp.bio,
    pp.service_area,
    pp.base_rate_min,
    pp.base_rate_max,
    pp.availability_status,
    pp.provider_status,
    pp.verification_status,
    pp.subscription_tier,
    pp.booking_fee_enabled,
    pp.booking_fee_amount,
    pp.avg_rating,
    pp.review_count,
    pp.completion_pct,
    pp.agency_name,
    pp.agency_logo_url,
    pp.search_vector,

    s.status                AS subscription_status,
    s.billing_cycle,
    s.current_period_end,
    s.grace_period_end
FROM users u
INNER JOIN provider_profiles pp ON pp.user_id = u.id
LEFT JOIN  subscriptions s      ON s.provider_profile_id = pp.id
WHERE u.role = 'PROVIDER'
  AND u.is_deleted = FALSE;

COMMENT ON VIEW v_providers IS 'Joined view of users + provider_profiles + subscriptions. Use for search queries and profile rendering. Filter by provider_status = ACTIVE for public-facing queries.';

-- Convenience view: consumers with their user data
CREATE VIEW v_consumers AS
SELECT
    u.id            AS user_id,
    u.firebase_uid,
    u.name,
    u.email,
    u.mobile,
    u.avatar_url,
    u.created_at,
    cp.id           AS consumer_profile_id,
    cp.preferred_localities,
    cp.saved_provider_ids
FROM users u
INNER JOIN consumer_profiles cp ON cp.user_id = u.id
WHERE u.role = 'CONSUMER'
  AND u.is_deleted = FALSE;

COMMENT ON VIEW v_consumers IS 'Joined view of users + consumer_profiles for consumer-facing queries.';


-- ============================================================
-- END OF SCHEMA
-- LocalPro MVP | Users & Roles
-- ============================================================
