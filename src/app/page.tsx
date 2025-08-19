import { FaSearch, FaHome, FaGraduationCap, FaPalette, FaSpa } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="text-2xl font-bold text-blue-600">ServiceHub</div>
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search services..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="space-x-4">
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">Login</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Find Trusted Local Services Fast</h1>
        <p className="text-xl">Connect with verified professionals in your area</p>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 border rounded-lg hover:shadow-lg cursor-pointer">
            <FaHome className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold">Home Repair</h3>
          </div>
          <div className="text-center p-6 border rounded-lg hover:shadow-lg cursor-pointer">
            <FaGraduationCap className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold">Tutoring</h3>
          </div>
          <div className="text-center p-6 border rounded-lg hover:shadow-lg cursor-pointer">
            <FaPalette className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold">Design</h3>
          </div>
          <div className="text-center p-6 border rounded-lg hover:shadow-lg cursor-pointer">
            <FaSpa className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold">Wellness</h3>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Search</h3>
            <p className="text-gray-600">Find the perfect service provider for your needs</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Book</h3>
            <p className="text-gray-600">Schedule your appointment with ease</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Pay Securely</h3>
            <p className="text-gray-600">Complete payment safely through our platform</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">"Amazing service! Found a great plumber within minutes and the booking process was seamless."</p>
            <p className="font-semibold">- Sarah Johnson</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto flex justify-center space-x-8">
          <a href="#" className="hover:text-blue-400">About</a>
          <a href="#" className="hover:text-blue-400">Terms</a>
          <a href="#" className="hover:text-blue-400">Privacy</a>
          <a href="#" className="hover:text-blue-400">Contact</a>
        </div>
      </footer>
    </div>
  );
}
