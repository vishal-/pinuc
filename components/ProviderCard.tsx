import Link from "next/link";
import { Provider } from "@/data/providers";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Link href={`/providers/${provider.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
        {/* Placeholder for provider image */}
        <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
          {provider.name.charAt(0)}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{provider.name}</h3>

          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400">★</span>
            <span className="font-semibold">{provider.rating}</span>
            <span className="text-gray-600 text-sm">
              ({provider.reviewCount})
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            {provider.servicesOffered[0]}
          </p>

          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-600">{provider.locality}</span>
            <Badge variant="secondary">{provider.experienceYears}y exp</Badge>
          </div>

          <p className="text-gray-700 text-sm line-clamp-2 mb-3">
            {provider.description}
          </p>

          <div className="flex gap-2">
            {provider.pricing &&
              provider.pricing.slice(0, 2).map((p) => (
                <Badge key={p.service} variant="outline">
                  ${p.price}
                </Badge>
              ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
