export interface Service {
    id: string;
    name: string;
    slug: string;
    category: "home-repair" | "tutors" | "events";
    description: string;
    icon: string;
}

export const services: Service[] = [
    // Home Repair
    {
        id: "s1",
        name: "Electrician",
        slug: "electrician",
        category: "home-repair",
        description: "Professional electrical services for homes and offices",
        icon: "⚡"
    },
    {
        id: "s2",
        name: "Plumber",
        slug: "plumber",
        category: "home-repair",
        description: "Trusted plumbing services for repairs and installations",
        icon: "🔧"
    },
    {
        id: "s3",
        name: "Carpenter",
        slug: "carpenter",
        category: "home-repair",
        description: "Custom carpentry and furniture solutions",
        icon: "🪚"
    },
    // Tutors
    {
        id: "s4",
        name: "Math Tutor",
        slug: "math-tutor",
        category: "tutors",
        description: "Expert math coaching for all levels",
        icon: "📐"
    },
    {
        id: "s5",
        name: "Science Tutor",
        slug: "science-tutor",
        category: "tutors",
        description: "Comprehensive science education and guidance",
        icon: "🔬"
    },
    {
        id: "s6",
        name: "Music Teacher",
        slug: "music-teacher",
        category: "tutors",
        description: "Professional music training and lessons",
        icon: "🎵"
    },
    // Events
    {
        id: "s7",
        name: "Photographer",
        slug: "photographer",
        category: "events",
        description: "Professional photography for all occasions",
        icon: "📷"
    },
    {
        id: "s8",
        name: "Makeup Artist",
        slug: "makeup-artist",
        category: "events",
        description: "Expert makeup services for events",
        icon: "💄"
    },
    {
        id: "s9",
        name: "Event Planner",
        slug: "event-planner",
        category: "events",
        description: "Complete event planning and management",
        icon: "🎉"
    }
];

export const serviceCategories = [
    {
        id: "cat1",
        name: "Home Repair",
        slug: "home-repair",
        description: "Find local professionals for home repairs and maintenance",
        serviceCount: 3
    },
    {
        id: "cat2",
        name: "Tutors & Teachers",
        slug: "tutors",
        description: "Discover experienced tutors and teachers near you",
        serviceCount: 3
    },
    {
        id: "cat3",
        name: "Event Services",
        slug: "events",
        description: "Find professionals to make your events memorable",
        serviceCount: 3
    }
];
