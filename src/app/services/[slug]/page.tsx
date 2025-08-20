import { notFound } from 'next/navigation';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import CategoryHero from '../../../components/categories/CategoryHero';
import SubcategoryNav from '../../../components/categories/SubcategoryNav';
import FilterPanel from '../../../components/categories/FilterPanel';
import ServiceListings from '../../../components/categories/ServiceListings';

// Mock data - replace with actual database calls
const mockCategory = {
  id: 1,
  name: 'Home Services',
  slug: 'home-services',
  description: 'Find trusted professionals for plumbing, cleaning, repairs, and more.',
  iconUrl: '🏠',
  subcategories: [
    { id: 1, name: 'Plumbing', slug: 'plumbing' },
    { id: 2, name: 'Cleaning', slug: 'cleaning' },
    { id: 3, name: 'Electrician', slug: 'electrician' },
    { id: 4, name: 'Gardening', slug: 'gardening' },
    { id: 5, name: 'Painting', slug: 'painting' },
    { id: 6, name: 'Pest Control', slug: 'pest-control' }
  ]
};

interface PageProps {
  params: { slug: string };
}

export default function CategoryPage({ params }: PageProps) {
  // In real app, fetch category by slug from database
  if (params.slug !== 'home-services') {
    notFound();
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--warm-neutral)'}}>
      <Header />
      <CategoryHero category={mockCategory} />
      <SubcategoryNav subcategories={mockCategory.subcategories} />
      
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