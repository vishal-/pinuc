import Link from "next/link";

interface ServiceCategoryCardProps {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export function ServiceCategoryCard({
  name,
  slug,
  description,
  icon
}: ServiceCategoryCardProps) {
  return (
    <Link href={`/services/${slug}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}
