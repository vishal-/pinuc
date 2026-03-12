import { notFound } from "next/navigation";
import { providers } from "@/data/providers";
import { ProviderProfile } from "@/components/ProviderProfile";
import { generateProviderMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const provider = providers.find((p) => p.slug === slug);

  if (!provider) {
    return { title: "Provider Not Found" };
  }

  const meta = generateProviderMetadata(provider);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: meta.openGraph
  };
}

export async function generateStaticParams() {
  return providers.map((provider) => ({
    slug: provider.slug
  }));
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = providers.find((p) => p.slug === slug);

  if (!provider) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProviderProfile provider={provider} />
    </div>
  );
}
