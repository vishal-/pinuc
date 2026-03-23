import prisma from "./prisma";
import {
    UserRole,
    AccountType,
    Vertical,
    AvailabilityStatus,
    SubscriptionTier,
    Prisma,
} from "@prisma/client";

/**
 * Create a new user in the database
 */
export async function createUser(data: {
    firebaseUid: string;
    name: string;
    email?: string;
    mobile?: string;
    role: UserRole;
    avatarUrl?: string;
}) {
    return prisma.user.create({
        data: {
            firebaseUid: data.firebaseUid,
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            role: data.role,
            avatarUrl: data.avatarUrl,
        },
    });
}

/**
 * Get user by Firebase UID
 */
export async function getUserByFirebaseUid(firebaseUid: string) {
    return prisma.user.findUnique({
        where: { firebaseUid },
        include: {
            consumerProfile: true,
            providerProfile: {
                include: {
                    subscription: true,
                },
            },
            adminProfile: true,
        },
    });
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string) {
    return prisma.user.findUnique({
        where: { id: userId },
        include: {
            consumerProfile: true,
            providerProfile: {
                include: {
                    subscription: true,
                },
            },
            adminProfile: true,
        },
    });
}

/**
 * Create a consumer profile for a user
 */
export async function createConsumerProfile(userId: string) {
    return prisma.consumerProfile.create({
        data: {
            userId,
        },
    });
}

/**
 * Create a provider profile
 */
export async function createProviderProfile(data: {
    userId: string;
    vertical: Vertical;
    displayName: string;
    slug: string;
    accountType?: AccountType;
    tagline?: string;
    bio?: string;
    agencyName?: string;
    agencyLogoUrl?: string;
    agencyDescription?: string;
}) {
    return prisma.providerProfile.create({
        data: {
            userId: data.userId,
            vertical: data.vertical,
            displayName: data.displayName,
            slug: data.slug,
            accountType: data.accountType || "INDIVIDUAL",
            tagline: data.tagline,
            bio: data.bio,
            agencyName: data.agencyName,
            agencyLogoUrl: data.agencyLogoUrl,
            agencyDescription: data.agencyDescription,
        },
        include: {
            subscription: true,
        },
    });
}

/**
 * Get provider profile by slug
 */
export async function getProviderBySlug(slug: string) {
    return prisma.providerProfile.findUnique({
        where: { slug },
        include: {
            user: true,
            subscription: true,
            staff: {
                orderBy: { displayOrder: "asc" },
            },
        },
    });
}

/**
 * Get all active providers for public search
 */
export async function getActiveProviders(filters?: {
    vertical?: Vertical;
    locality?: string;
    subscriptionTier?: string;
}) {
    return prisma.providerProfile.findMany({
        where: {
            providerStatus: "ACTIVE",
            user: { isDeleted: false },
            ...(filters?.vertical && { vertical: filters.vertical }),
            ...(filters?.locality && {
                serviceArea: { hasSome: [filters.locality] },
            }),
        },
        include: {
            user: true,
            subscription: true,
        },
        orderBy: {
            avgRating: "desc",
        },
    });
}

/**
 * Update provider availability
 */
export async function updateProviderAvailability(
    providerProfileId: string,
    availabilityStatus: AvailabilityStatus
) {
    return prisma.providerProfile.update({
        where: { id: providerProfileId },
        data: {
            availabilityStatus,
        },
    });
}

/**
 * Update provider ratings (denormalised)
 */
export async function updateProviderRating(
    providerProfileId: string,
    avgRating: number,
    reviewCount: number
) {
    return prisma.providerProfile.update({
        where: { id: providerProfileId },
        data: {
            avgRating: new Prisma.Decimal(avgRating),
            reviewCount,
        },
    });
}

/**
 * Add staff to agency
 */
export async function addAgencyStaff(data: {
    providerProfileId: string;
    name: string;
    roleTitle: string;
    photoUrl?: string;
    bio?: string;
    displayOrder: number;
}) {
    return prisma.agencyStaff.create({
        data,
    });
}

/**
 * Create admin profile
 */
export async function createAdminProfile(data: {
    userId: string;
    displayName: string;
    isSuperAdmin?: boolean;
    notes?: string;
}) {
    return prisma.adminProfile.create({
        data: {
            userId: data.userId,
            displayName: data.displayName,
            isSuperAdmin: data.isSuperAdmin || false,
            notes: data.notes,
        },
    });
}

/**
 * Update subscription tier
 */
export async function updateSubscriptionTier(
    providerProfileId: string,
    tier: SubscriptionTier
) {
    return prisma.subscription.update({
        where: { providerProfileId },
        data: {
            tier,
        },
    });
}
