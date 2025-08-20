import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import CategoryHero from '../../../components/categories/CategoryHero';
import SubcategoryNav from '../../../components/categories/SubcategoryNav';
import FilterPanel from '../../../components/categories/FilterPanel';
import ServiceListings from '../../../components/categories/ServiceListings';

const prisma = new PrismaClient();

interface PageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: PageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      subcategories: {
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' }
      }
    }
  });

  if (!category || !category.isActive) {
    notFound();
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--warm-neutral)'}}>
      <Header />
      <CategoryHero category={category} />
      <SubcategoryNav subcategories={category.subcategories} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <FilterPanel />
          <ServiceListings />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}