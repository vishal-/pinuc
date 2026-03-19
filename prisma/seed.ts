import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting database seed...");

    // Clean up existing data (optional)
    await prisma.user.deleteMany({});
    console.log("✓ Cleaned existing data");

    // Create test users
    const consumerUser = await prisma.user.create({
        data: {
            firebaseUid: "test_consumer_001",
            name: "Priya Sharma",
            email: "priya@example.com",
            mobile: "+919876543210",
            role: "CONSUMER",
        },
    });

    const providerUser = await prisma.user.create({
        data: {
            firebaseUid: "test_provider_001",
            name: "Ravi Kumar",
            email: "ravi@example.com",
            mobile: "+919123456789",
            role: "PROVIDER",
        },
    });

    const adminUser = await prisma.user.create({
        data: {
            firebaseUid: "test_admin_001",
            name: "Admin User",
            email: "admin@example.com",
            role: "ADMIN",
        },
    });

    console.log("✓ Created test users");

    // Create consumer profile
    await prisma.consumerProfile.create({
        data: {
            userId: consumerUser.id,
            preferredLocalities: ["Dwarka", "South Delhi"],
        },
    });

    console.log("✓ Created consumer profile");

    // Create provider profile (Individual)
    await prisma.providerProfile.create({
        data: {
            userId: providerUser.id,
            vertical: "HOME",
            displayName: "Ravi's Electrical Services",
            slug: "ravi-electrical-services-dwarka",
            tagline: "Reliable electrical work for homes and offices",
            bio: "With 8 years of experience, I provide professional electrical installation, repair, and maintenance services.",
            serviceArea: ["Dwarka", "Sector 8", "Sector 9"],
            baseRateMin: 50000, // ₹500
            baseRateMax: 80000, // ₹800
            accountType: "INDIVIDUAL",
            completionPct: 75,
            avgRating: new Prisma.Decimal("4.5"),
            reviewCount: 24,
        },
    });

    console.log("✓ Created provider profile");

    // Create admin profile
    await prisma.adminProfile.create({
        data: {
            userId: adminUser.id,
            displayName: "Platform Admin",
            isSuperAdmin: true,
            notes: "Test admin account",
        },
    });

    console.log("✓ Created admin profile");

    // Create agency provider
    const agencyUser = await prisma.user.create({
        data: {
            firebaseUid: "test_agency_001",
            name: "Photography Pro Studio",
            email: "studio@example.com",
            mobile: "+919988776655",
            role: "PROVIDER",
        },
    });

    const agencyProfile = await prisma.providerProfile.create({
        data: {
            userId: agencyUser.id,
            vertical: "HOME",
            displayName: "Photography Pro Studio",
            slug: "photography-pro-studio-delhi",
            tagline: "Professional photography for weddings, events, and portraits",
            bio: "We are a team of experienced photographers specializing in weddings, pre-wedding shoots, and corporate events.",
            serviceArea: ["Delhi", "Gurgaon", "Noida"],
            baseRateMin: 200000, // ₹2000
            baseRateMax: 500000, // ₹5000
            accountType: "AGENCY",
            agencyName: "Photography Pro Studio",
            agencyDescription:
                "Leading photography agency in Delhi NCR with a team of 5+ professional photographers.",
            completionPct: 100,
            avgRating: new Prisma.Decimal("4.8"),
            reviewCount: 156,
        },
    });

    console.log("✓ Created agency provider");

    // Add staff to agency
    await prisma.agencyStaff.createMany({
        data: [
            {
                providerProfileId: agencyProfile.id,
                name: "Amit Singh",
                roleTitle: "Lead Photographer",
                bio: "10+ years experience in wedding photography",
                displayOrder: 0,
            },
            {
                providerProfileId: agencyProfile.id,
                name: "Sneha Patel",
                roleTitle: "Portrait Specialist",
                bio: "Expert in studio and outdoor portraits",
                displayOrder: 1,
            },
            {
                providerProfileId: agencyProfile.id,
                name: "Vikram Verma",
                roleTitle: "Video Editor",
                bio: "Professional video editing and post-production",
                displayOrder: 2,
            },
        ],
    });

    console.log("✓ Added agency staff");

    console.log("\n✅ Database seed completed!");
    console.log("\nTest Credentials:");
    console.log("- Consumer:", consumerUser.firebaseUid);
    console.log("- Provider:", providerUser.firebaseUid);
    console.log("- Agency:", agencyUser.firebaseUid);
    console.log("- Admin:", adminUser.firebaseUid);
}

main()
    .catch((e) => {
        console.error("🔴 Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// Import Prisma types
import { Prisma } from "@prisma/client";
