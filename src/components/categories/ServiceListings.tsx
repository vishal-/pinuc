import { FaStar } from 'react-icons/fa';

const mockServices = [
  {
    id: 1,
    name: 'John the Plumber',
    rating: 4.8,
    price: '₹500/hr',
    description: 'Quick and reliable',
    image: '🔧'
  },
  {
    id: 2,
    name: 'CleanCo',
    rating: 4.5,
    price: '₹300/hr',
    description: 'Eco-friendly cleaning',
    image: '🧽'
  },
  {
    id: 3,
    name: 'ElectricPro',
    rating: 4.9,
    price: '₹600/hr',
    description: 'Licensed electrician',
    image: '⚡'
  }
];

export default function ServiceListings() {
  return (
    <main className="flex-1">
      <div className="space-y-4">
        {mockServices.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow-lg border" style={{borderColor: 'var(--warm-neutral)'}}>
            <div className="flex gap-4">
              <div className="text-4xl">{service.image}</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--dark-gray)'}}>{service.name}</h3>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <FaStar style={{color: '#FFD700'}} />
                    <span className="font-medium" style={{color: 'var(--dark-gray)'}}>{service.rating}</span>
                  </div>
                  <span className="font-medium" style={{color: 'var(--primary-blue)'}}>{service.price}</span>
                  <span style={{color: 'var(--medium-gray)'}}>"{service.description}"</span>
                </div>
                <div className="flex gap-3">
                  <button 
                    className="px-4 py-2 border rounded-lg hover:opacity-90"
                    style={{borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)'}}
                  >
                    View Profile
                  </button>
                  <button 
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                    style={{backgroundColor: 'var(--primary-blue)'}}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button className="px-3 py-2 border rounded" style={{borderColor: 'var(--medium-gray)', color: 'var(--medium-gray)'}}>◀ Prev</button>
        <button className="px-3 py-2 text-white rounded" style={{backgroundColor: 'var(--primary-blue)'}}>1</button>
        <button className="px-3 py-2 border rounded" style={{borderColor: 'var(--medium-gray)', color: 'var(--dark-gray)'}}>2</button>
        <button className="px-3 py-2 border rounded" style={{borderColor: 'var(--medium-gray)', color: 'var(--dark-gray)'}}>3</button>
        <button className="px-3 py-2 border rounded" style={{borderColor: 'var(--medium-gray)', color: 'var(--dark-gray)'}}>Next ▶</button>
      </div>
    </main>
  );
}