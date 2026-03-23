"use client";

import { Provider } from "@/data/providers";
import { ReviewsSection } from "./ReviewsSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProviderProfileProps {
  provider: Provider;
}

export function ProviderProfile({ provider }: ProviderProfileProps) {
  const handleCall = () => {
    window.location.href = `tel:${provider.phone}`;
  };

  const handleMessage = () => {
    window.location.href = `mailto:${provider.email}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex gap-8 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {provider.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl text-yellow-400">★</span>
              <span className="text-xl font-semibold">{provider.rating}</span>
              <span className="text-gray-600">
                ({provider.reviewCount} reviews)
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              📍 {provider.locality}, {provider.location}
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary">
                {provider.providerType === "individual"
                  ? "Individual"
                  : "Agency"}
              </Badge>
              <Badge variant="secondary">
                {provider.experienceYears} years experience
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="text-gray-700 leading-relaxed">{provider.description}</p>
      </div>

      {/* Services Offered */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Services Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {provider.servicesOffered.map((service) => (
            <div
              key={service}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-blue-600">✓</span>
              <span className="text-gray-700 capitalize">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Pricing</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Service</th>
                <th className="text-right py-2 px-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {provider.pricing.map((p) => (
                <tr key={p.service} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{p.service}</td>
                  <td className="text-right py-3 px-4 font-semibold">
                    ${p.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Portfolio */}
      {provider.portfolioImages.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {provider.portfolioImages.map((image, idx) => (
              <div
                key={idx}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-500">
                  [Portfolio Image {idx + 1}]
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <ReviewsSection provider={provider} />

      {/* Contact Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <div className="flex gap-4 flex-wrap">
          <Button
            onClick={handleCall}
            variant="success"
            className="flex-1 min-w-40 py-3 text-base"
          >
            📞 Call Now
          </Button>
          <Button
            onClick={handleMessage}
            className="flex-1 min-w-40 py-3 text-base"
          >
            ✉️ Send Message
          </Button>
          <Button variant="purple" className="flex-1 min-w-40 py-3 text-base">
            📨 Request Service
          </Button>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-sm">
          <p>
            <strong>Phone:</strong> {provider.phone}
          </p>
          <p>
            <strong>Email:</strong> {provider.email}
          </p>
        </div>
      </div>
    </div>
  );
}
