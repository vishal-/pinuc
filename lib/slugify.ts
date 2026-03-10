/**
 * Converts a string to a URL-friendly slug
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}

/**
 * Generates a provider slug from name, service, and location
 * Example: "Raj Electrical Services" + "electrician" + "Dwarka" => "raj-electrician-dwarka-delhi"
 */
export function generateProviderSlug(
    name: string,
    service: string,
    location: string
): string {
    const service_slug = slugify(service);
    const location_slug = slugify(location);

    // Extract first word of provider name for shorter slug
    const nameSlug = slugify(name.split(" ")[0]);

    return `${nameSlug}-${service_slug}-${location_slug}-delhi`;
}

/**
 * Extracts provider info from slug
 */
export function extractFromSlug(
    slug: string
): { name: string; service: string; location: string } | null {
    const parts = slug.split("-");

    if (parts.length < 4 || parts[parts.length - 1] !== "delhi") {
        return null;
    }

    // Last part is always "delhi"
    parts.pop();

    // Last remaining part should be location
    const location = parts.pop() || "";
    // Middle part should be service
    const service = parts.pop() || "";
    // First part is name
    const name = parts.join("-");

    return { name, service, location };
}
