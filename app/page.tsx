import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { ServiceCategoryCard } from "@/components/ServiceCategoryCard";
import { ProviderCard } from "@/components/ProviderCard";
import { Card } from "@/components/ui/card";
import { services, serviceCategories } from "@/data/services";
import { locations } from "@/data/locations";
import { providers } from "@/data/providers";
import { getFeaturedProviders } from "@/lib/filters";

export default function Home() {
  const featuredProviders = getFeaturedProviders(providers, 6);
  const allCategories = serviceCategories;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Find Local Services in Delhi
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover trusted professionals for home repair, tutoring, and
              events
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allCategories.map((category) => (
            <ServiceCategoryCard
              key={category.id}
              name={category.name}
              slug={category.slug}
              description={category.description}
              icon={["⚙️", "📚", "🎉"][allCategories.indexOf(category)]}
            />
          ))}
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-2">Featured Providers</h2>
          <p className="text-gray-600 mb-8">
            Top-rated professionals in your area
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Popular Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {locations.map((location) => (
            <Link key={location.id} href={`/electricians/${location.slug}`}>
              <Card className="p-6 hover:shadow-lg transition text-center cursor-pointer h-full">
                <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                <p className="text-sm text-gray-600">
                  {location.providerCount} providers
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Service Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-2">All Services</h2>
          <p className="text-gray-600 mb-8">Explore all available services</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.category}`}>
                <Card className="p-6 hover:shadow-lg transition cursor-pointer h-full">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Are You a Service Provider?
          </h2>
          <p className="text-blue-100 mb-8">
            Join LocalHub and reach thousands of potential customers
          </p>
          <Link
            href="/join-as-provider"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Register Your Business
          </Link>
        </div>
      </section>
    </div>
  );
}
