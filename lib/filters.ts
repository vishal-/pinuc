import { Provider } from "@/data/providers";
import { slugify } from "./slugify";

/**
 * Filter providers by service category
 */
export function filterByCategory(
    providers: Provider[],
    category: string
): Provider[] {
    return providers.filter((p) => p.serviceCategory === category);
}

/**
 * Filter providers by service type
 */
export function filterByService(
    providers: Provider[],
    service: string
): Provider[] {
    const serviceSlug = slugify(service);
    return providers.filter((p) =>
        p.servicesOffered.some((s) => slugify(s).includes(serviceSlug) || serviceSlug.includes(slugify(s)))
    );
}

/**
 * Filter providers by locality
 */
export function filterByLocality(
    providers: Provider[],
    locality: string
): Provider[] {
    const localitySlug = slugify(locality);
    return providers.filter((p) => slugify(p.locality) === localitySlug);
}

/**
 * Filter providers by multiple criteria
 */
export function filterProviders(
    providers: Provider[],
    filters: {
        category?: string;
        service?: string;
        locality?: string;
        minRating?: number;
    }
): Provider[] {
    let filtered = providers;

    if (filters.category) {
        filtered = filterByCategory(filtered, filters.category);
    }

    if (filters.service) {
        filtered = filterByService(filtered, filters.service);
    }

    if (filters.locality) {
        filtered = filterByLocality(filtered, filters.locality);
    }

    if (filters.minRating) {
        filtered = filtered.filter((p) => p.rating >= filters.minRating!);
    }

    return filtered;
}

/**
 * Search providers by name or service
 */
export function searchProviders(
    providers: Provider[],
    query: string
): Provider[] {
    const searchTerm = slugify(query);
    return providers.filter((p) => {
        const nameMatch = slugify(p.name).includes(searchTerm);
        const serviceMatch = p.servicesOffered.some((s) =>
            slugify(s).includes(searchTerm)
        );
        const localityMatch = slugify(p.locality).includes(searchTerm);
        return nameMatch || serviceMatch || localityMatch;
    });
}

/**
 * Get featured providers (top rated)
 */
export function getFeaturedProviders(providers: Provider[], limit = 6): Provider[] {
    return providers.sort((a, b) => b.rating - a.rating).slice(0, limit);
}
