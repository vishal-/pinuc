import { notFound } from "next/navigation";
import { providers } from "@/data/providers";
import { serviceCategories } from "@/data/services";
import { ProviderCard } from "@/components/ProviderCard";
import { generateCategoryMetadata } from "@/lib/seo";
import { filterByCategory } from "@/lib/filters";

interface Props {
  params: { category: string };
}

export async function generateMetadata({ params }: Props) {
  const meta = generateCategoryMetadata(params.category);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords
  };
}

export async function generateStaticParams() {
  return serviceCategories.map((cat) => ({
    category: cat.slug
  }));
}

export default function CategoryPage({ params }: Props) {
  const category = serviceCategories.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const categoryProviders = filterByCategory(providers, params.category as any);

  const categoryNameMap: Record<string, string> = {
    "home-repair": "Home Repair",
    tutors: "Tutors & Teachers",
    events: "Event Services"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {categoryNameMap[params.category]}
          </h1>
          <p className="text-lg text-gray-600">
            Browse all available providers in this category
          </p>
        </div>

        {/* Filters (simple display) */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">
            Showing {categoryProviders.length} providers
          </p>
        </div>

        {/* Provider Grid */}
        {categoryProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No providers found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
