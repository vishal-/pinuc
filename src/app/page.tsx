import { FaHome, FaGraduationCap, FaPalette, FaSpa } from 'react-icons/fa';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="py-20 text-center text-white" style={{backgroundColor: 'var(--primary-blue)'}}>
        <h1 className="text-5xl font-bold mb-4">Find Trusted Local Services Fast</h1>
        <p className="text-xl">Connect with verified professionals in your area</p>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-4" style={{backgroundColor: 'var(--soft-white)'}}>
        <h2 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--dark-gray)'}}>Popular Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 border rounded-lg hover:shadow-lg cursor-pointer" style={{backgroundColor: 'var(--warm-neutral)', borderColor: 'var(--warm-neutral)'}}>
            <FaHome className="text-4xl mx-auto mb-4" style={{color: 'var(--primary-blue)'}} />
            <h3 className="font-semibold" style={{color: 'var(--dark-gray)'}}>Home Repair</h3>
          </div>
          <div className="text-center p-6 border rounded-lg hover:shadow-lg cursor-pointer" style={{backgroundColor: 'var(--warm-neutral)', borderColor: 'var(--warm-neutral)'}}>
            <FaGraduationCap className="text-4xl mx-auto mb-4" style={{color: 'var(--primary-blue)'}} />
            <h3 className="font-semibold" style={{color: 'var(--dark-gray)'}}>Tutoring</h3>
          </div>
          <div className="text-center p-6 border rounded-lg hover:shadow-lg cursor-pointer" style={{backgroundColor: 'var(--warm-neutral)', borderColor: 'var(--warm-neutral)'}}>
            <FaPalette className="text-4xl mx-auto mb-4" style={{color: 'var(--primary-blue)'}} />
            <h3 className="font-semibold" style={{color: 'var(--dark-gray)'}}>Design</h3>
          </div>
          <div className="text-center p-6 border rounded-lg hover:shadow-lg cursor-pointer" style={{backgroundColor: 'var(--warm-neutral)', borderColor: 'var(--warm-neutral)'}}>
            <FaSpa className="text-4xl mx-auto mb-4" style={{color: 'var(--primary-blue)'}} />
            <h3 className="font-semibold" style={{color: 'var(--dark-gray)'}}>Wellness</h3>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4" style={{backgroundColor: 'var(--warm-neutral)'}}>
        <h2 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--dark-gray)'}}>How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{backgroundColor: 'var(--primary-blue)'}}>1</div>
            <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--dark-gray)'}}>Search</h3>
            <p style={{color: 'var(--medium-gray)'}}>Find the perfect service provider for your needs</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{backgroundColor: 'var(--primary-blue)'}}>2</div>
            <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--dark-gray)'}}>Book</h3>
            <p style={{color: 'var(--medium-gray)'}}>Schedule your appointment with ease</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{backgroundColor: 'var(--primary-blue)'}}>3</div>
            <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--dark-gray)'}}>Pay Securely</h3>
            <p style={{color: 'var(--medium-gray)'}}>Complete payment safely through our platform</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4" style={{backgroundColor: 'var(--soft-white)'}}>
        <h2 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--dark-gray)'}}>What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-lg shadow-lg text-center" style={{backgroundColor: 'var(--soft-white)'}}>
            <p className="text-lg mb-4" style={{color: 'var(--dark-gray)'}}>&ldquo;Amazing service! Found a great plumber within minutes and the booking process was seamless.&rdquo;</p>
            <p className="font-semibold" style={{color: 'var(--medium-gray)'}}>- Sarah Johnson</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
