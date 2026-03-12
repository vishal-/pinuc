import { Provider } from "@/data/providers";

export function generateProviderMetadata(provider: Provider) {
    const title = `${provider.name} – ${provider.servicesOffered[0]} in ${provider.locality} Delhi`;
    const description = `Find ${provider.name}, a trusted ${provider.servicesOffered[0]} in ${provider.locality} Delhi with ${provider.experienceYears} years of experience. Rating: ${provider.rating}/5 from ${provider.reviewCount} reviews. Book now!`;

    return {
        title,
        description,
        keywords: [
            provider.name,
            provider.servicesOffered[0],
            provider.locality,
            "Delhi",
            "local services"
        ],
        openGraph: {
            title,
            description,
            type: "website",
            locale: "en_IN"
        }
    };
}

export function generateCategoryMetadata(category: string) {
    const categoryNames: Record<string, string> = {
        "home-repair": "Home Repair Services",
        tutors: "Tutors & Teachers",
        events: "Event Services"
    };

    const title = `Best ${categoryNames[category] || category} in Delhi | Local ${categoryNames[category]} Directory`;
    const description = `Discover the best ${categoryNames[category]?.toLowerCase()} in Delhi. Find highly-rated professionals near you. Compare reviews, ratings, and pricing. Book your service today!`;

    return {
        title,
        description,
        keywords: [
            categoryNames[category],
            "Delhi",
            "local services",
            "trusted professionals",
            "service directory"
        ]
    };
}

export function generateServiceLocationMetadata(service: string, location: string) {
    const serviceNames: Record<string, string> = {
        electrician: "Electricians",
        plumber: "Plumbers",
        carpenter: "Carpenters",
        "math-tutor": "Math Tutors",
        "science-tutor": "Science Tutors",
        "music-teacher": "Music Teachers",
        photographer: "Photographers",
        "makeup-artist": "Makeup Artists",
        "event-planner": "Event Planners"
    };

    const serviceName = serviceNames[service] || service || "Services";
    const serviceNameSingular = serviceName && serviceName.length > 0 ? serviceName.slice(0, -1) : "Service";
    const title = `${serviceName} in ${location} | Find Best ${serviceNameSingular} Near You`;
    const description = `Looking for ${serviceName.toLowerCase()} in ${location}? Discover trusted and verified local ${serviceName.toLowerCase()} with ratings and reviews. Compare pricing and book your service today.`;

    return {
        title,
        description,
        keywords: [
            serviceName,
            location,
            "Delhi",
            "local services",
            "trusted professionals"
        ]
    };
}
