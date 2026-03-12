import { notFound } from "next/navigation";
import { providers } from "@/data/providers";
import { locations } from "@/data/locations";
import { ProviderCard } from "@/components/ProviderCard";
import { generateServiceLocationMetadata } from "@/lib/seo";
import { filterByService } from "@/lib/filters";
import { slugify } from "@/lib/slugify";

interface Props {
  params: Promise<{ service: string; location: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { service, location } = await params;
  const meta = generateServiceLocationMetadata(service, location);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords
  };
}

export async function generateStaticParams() {
  const serviceList = [
    "electrician",
    "plumber",
    "carpenter",
    "math-tutor",
    "science-tutor",
    "music-teacher",
    "photographer",
    "makeup-artist",
    "event-planner"
  ];

  const params: unknown[] = [];

  for (const service of serviceList) {
    for (const location of locations) {
      params.push({
        service: service,
        location: location.slug
      });
    }
  }

  return params;
}

export default async function ServiceLocationPage({ params }: Props) {
  const { service, location } = await params;
  const locationName = locations.find((l) => l.slug === location);

  if (!locationName) {
    notFound();
  }

  // Filter by service and location
  let filtered = filterByService(providers, service);
  filtered = filtered.filter(
    (p) => slugify(p.locality) === slugify(locationName.name)
  );

  // Format display names
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

  const serviceName = serviceNames[service] || service;
  const locationDisplayName = locationName.name;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            {serviceName} in {locationDisplayName}
          </h1>
          <p className="text-lg text-gray-600">
            Find trusted local {serviceName.toLowerCase()} near you
          </p>
        </div>

        {/* Results Info */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">
            Found {filtered.length}{" "}
            {filtered.length === 1 ? "provider" : "providers"}
          </p>
        </div>

        {/* Provider Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">
              No {serviceName.toLowerCase()} found in {locationDisplayName}.
            </p>
            <p className="text-gray-500 mt-2">
              Try another location or service
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
