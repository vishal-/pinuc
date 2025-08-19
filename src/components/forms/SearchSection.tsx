import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

export default function SearchSection() {
  return (
    <section className="py-6 sm:py-12 px-4" style={{backgroundColor: 'var(--soft-white)'}}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border" style={{borderColor: 'var(--warm-neutral)'}}>
          <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4 sm:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-gray)'}}>
                What service do you need?
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm" style={{color: 'var(--medium-gray)'}} />
                <input 
                  type="text" 
                  placeholder="e.g. Plumber, Tutor, Designer..." 
                  className="w-full pl-10 pr-4 py-3 border rounded-lg text-base focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--soft-white)', 
                    borderColor: 'var(--medium-gray)',
                    '--tw-ring-color': 'var(--primary-blue)'
                  }}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-gray)'}}>
                Where?
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm" style={{color: 'var(--medium-gray)'}} />
                <input 
                  type="text" 
                  placeholder="Enter your location" 
                  className="w-full pl-10 pr-4 py-3 border rounded-lg text-base focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--soft-white)', 
                    borderColor: 'var(--medium-gray)',
                    '--tw-ring-color': 'var(--primary-blue)'
                  }}
                />
              </div>
            </div>
            <button 
              className="w-full sm:w-auto px-8 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              style={{backgroundColor: 'var(--primary-blue)'}}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}