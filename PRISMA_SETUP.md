# Prisma Database Setup Guide

This document covers setting up Prisma ORM with your PostgreSQL database (recommended: Supabase).

## 1. Prerequisites

- PostgreSQL database (Supabase recommended for development)
- Node.js 16+

## 2. Environment Setup

Add your database URL to `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/localpro_dev?schema=public"

# Firebase (existing)
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
```

For **Supabase**:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to **Settings > Database** → Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your database password

## 3. Generate Prisma Client

After configuring `.env.local`, run:

```bash
npx prisma generate
```

This generates the Prisma Client library.

## 4. Create Database Schema

### Option A: Push Schema (Development)

For rapid iteration in development:

```bash
npx prisma db push
```

This syncs your `schema.prisma` to the database and creates tables.

### Option B: Migrations (Production)

For production deployments, use migrations:

```bash
# Create a new migration
npx prisma migrate dev --name init

# Apply migrations in production
npx prisma migrate deploy
```

## 5. Seed Database (Optional)

To add initial test data:

```bash
# Create a seed file
npx prisma db seed
```

See `prisma/seed.ts` for examples.

## 6. Prisma Studio (Development Tool)

View and edit your database in a GUI:

```bash
npx prisma studio
```

This opens http://localhost:5555 with a visual DB browser.

## File Structure

```
prisma/
├── schema.prisma      # Your Prisma schema (auto-migrated)
├── seed.ts            # Optional: seed sample data
└── migrations/        # Migration history (auto-generated)

lib/
├── prisma.ts          # Singleton Prisma Client
├── db.ts              # Helper functions for common queries
└── auth-context.tsx   # Firebase Auth + Prisma sync
```

## Usage in Your App

### Import from centralized location

```typescript
import prisma from "@/lib/prisma";
// or use helpers:
import { createUser, getProviderBySlug } from "@/lib/db";
```

### Common Operations

**Create a user:**

```typescript
import { createUser } from "@/lib/db";

const user = await createUser({
  firebaseUid: firebaseUser.uid,
  name: "John Doe",
  email: firebaseUser.email,
  role: "CONSUMER"
});
```

**Get user with full profile:**

```typescript
import { getUserByFirebaseUid } from "@/lib/db";

const user = await getUserByFirebaseUid(firebaseUid);
// Includes: consumerProfile, providerProfile, adminProfile
```

**Search active providers:**

```typescript
import { getActiveProviders } from "@/lib/db";

const providers = await getActiveProviders({
  vertical: "HOME",
  locality: "Dwarka"
});
```

**Update provider rating:**

```typescript
import { updateProviderRating } from "@/lib/db";

await updateProviderRating(providerId, 4.75, 42);
```

## Integration with Firebase Auth

When users sign in via Firebase:

1. **On first login**: Create a `User` row + role-specific profile
2. **On subsequent logins**: Fetch existing user
3. **On logout**: Update `lastLoginAt` timestamp

This is handled in `lib/auth-context.tsx` via `syncUserWithDatabase()`.

## Common Tasks

### Create a new migration

```bash
npx prisma migrate dev --name add_new_field
```

### Reset database (⚠️ Development Only)

This deletes all data and re-runs migrations:

```bash
npx prisma migrate reset
```

### Check schema for issues

```bash
npx prisma validate
```

## Schema Reference

### Models

- **User** — Base identity for all users (Consumers, Providers, Admins)
- **ConsumerProfile** — Extended data for consumers
- **ProviderProfile** — Extended data for providers (Individual or Agency)
- **AgencyStaff** — Staff members under an agency (not users)
- **AdminProfile** — Extended data for admin users
- **Subscription** — Billing/tier data for providers
- **VerificationRequest** — Verified badge application workflow

### Enums

- `UserRole` — CONSUMER, PROVIDER, ADMIN
- `AccountType` — INDIVIDUAL, AGENCY
- `SubscriptionTier` — FREE, STANDARD, PRO, AGENCY
- `Vertical` — HOME, TUTOR
- `ProviderStatus` — PENDING, ACTIVE, SUSPENDED, REMOVED
- `VerificationStatus` — NOT_APPLIED, PENDING, VERIFIED, REJECTED

## Troubleshooting

### "PrismaClientInitializationError"

Make sure `.env.local` has a valid `DATABASE_URL`:

```bash
# Test the connection
npx prisma db execute --stdin <<< "SELECT 1;"
```

### Migration conflicts

If migrations are out of sync:

```bash
# Resolve with:
npx prisma migrate resolve --rolled-back <migration-name>
```

### Generated types missing

Regenerate the Prisma Client:

```bash
npx prisma generate
```

## Production Deployment

### Supabase/Railway/Render

1. Set `DATABASE_URL` environment variable in platform settings
2. Run migrations before deploying:
   ```bash
   npx prisma migrate deploy
   ```
3. Rebuild and deploy

## Next Steps

1. ✅ Create `DATABASE_URL` in `.env.local`
2. ✅ Run `npx prisma db push`
3. ✅ Verify schema in Prisma Studio: `npx prisma studio`
4. ✅ Start using helpers from `lib/db.ts`
5. Update `lib/auth-context.tsx` to sync Firebase users to Prisma on login
