import { FaSearch } from 'react-icons/fa';

export default function FilterPanel() {
  return (
    <aside className="w-80 hidden lg:block">
      <div className="bg-white p-6 rounded-lg shadow-lg" style={{borderColor: 'var(--warm-neutral)'}}>
        <div className="flex items-center gap-2 mb-6">
          <FaSearch style={{color: 'var(--primary-blue)'}} />
          <h3 className="text-lg font-semibold" style={{color: 'var(--dark-gray)'}}>Filters</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-gray)'}}>Location</label>
            <input 
              type="text" 
              placeholder="Enter location" 
              className="w-full p-3 border rounded-lg"
              style={{backgroundColor: 'var(--soft-white)', borderColor: 'var(--medium-gray)'}}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-gray)'}}>Price Range</label>
            <select className="w-full p-3 border rounded-lg" style={{backgroundColor: 'var(--soft-white)', borderColor: 'var(--medium-gray)'}}>
              <option>Any Price</option>
              <option>₹0 - ₹500</option>
              <option>₹500 - ₹1000</option>
              <option>₹1000+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-gray)'}}>Rating</label>
            <select className="w-full p-3 border rounded-lg" style={{backgroundColor: 'var(--soft-white)', borderColor: 'var(--medium-gray)'}}>
              <option>Any Rating</option>
              <option>4.5+ Stars</option>
              <option>4.0+ Stars</option>
              <option>3.5+ Stars</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-gray)'}}>Availability</label>
            <select className="w-full p-3 border rounded-lg" style={{backgroundColor: 'var(--soft-white)', borderColor: 'var(--medium-gray)'}}>
              <option>Any Time</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
}