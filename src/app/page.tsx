import { PrismaClient } from '@prisma/client';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SearchSection from '../components/forms/SearchSection';

const prisma = new PrismaClient();

export default async function Home() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
    take: 4
  });
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="py-12 sm:py-20 px-4 text-center text-white" style={{backgroundColor: 'var(--primary-blue)'}}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Find Trusted Local Services Fast</h1>
        <p className="text-lg sm:text-xl">Connect with verified professionals in your area</p>
      </section>

      <SearchSection />

      {/* Service Categories */}
      <section className="py-12 sm:py-16 px-4" style={{backgroundColor: 'var(--soft-white)'}}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12" style={{color: 'var(--dark-gray)'}}>Popular Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
          {categories.map((category) => (
            <a 
              key={category.id}
              href={`/services/${category.slug}`}
              className="text-center p-4 sm:p-6 border rounded-lg hover:shadow-lg cursor-pointer transition-shadow" 
              style={{backgroundColor: 'var(--warm-neutral)', borderColor: 'var(--warm-neutral)'}}
            >
              <div className="text-2xl sm:text-4xl mx-auto mb-2 sm:mb-4">{category.iconUrl || '📋'}</div>
              <h3 className="text-sm sm:text-base font-semibold" style={{color: 'var(--dark-gray)'}}>{category.name}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 px-4" style={{backgroundColor: 'var(--warm-neutral)'}}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12" style={{color: 'var(--dark-gray)'}}>How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4" style={{backgroundColor: 'var(--primary-blue)'}}>1</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{color: 'var(--dark-gray)'}}>Search</h3>
            <p className="text-sm sm:text-base" style={{color: 'var(--medium-gray)'}}>Find the perfect service provider for your needs</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4" style={{backgroundColor: 'var(--primary-blue)'}}>2</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{color: 'var(--dark-gray)'}}>Book</h3>
            <p className="text-sm sm:text-base" style={{color: 'var(--medium-gray)'}}>Schedule your appointment with ease</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4" style={{backgroundColor: 'var(--primary-blue)'}}>3</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{color: 'var(--dark-gray)'}}>Pay Securely</h3>
            <p className="text-sm sm:text-base" style={{color: 'var(--medium-gray)'}}>Complete payment safely through our platform</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 px-4" style={{backgroundColor: 'var(--soft-white)'}}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12" style={{color: 'var(--dark-gray)'}}>What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-lg shadow-lg text-center" style={{backgroundColor: 'var(--soft-white)'}}>
            <p className="text-base sm:text-lg mb-4" style={{color: 'var(--dark-gray)'}}>&ldquo;Amazing service! Found a great plumber within minutes and the booking process was seamless.&rdquo;</p>
            <p className="text-sm sm:text-base font-semibold" style={{color: 'var(--medium-gray)'}}>- Sarah Johnson</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
