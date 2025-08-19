import { FaSearch } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b" style={{backgroundColor: 'var(--soft-white)', borderColor: 'var(--warm-neutral)'}}>
      <div className="text-2xl font-bold" style={{color: 'var(--primary-blue)'}}>ServiceHub</div>
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3" style={{color: 'var(--medium-gray)'}} />
          <input 
            type="text" 
            placeholder="Search services..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            style={{backgroundColor: 'var(--soft-white)', borderColor: 'var(--medium-gray)'}}
          />
        </div>
      </div>
      <div className="space-x-4">
        <button className="px-4 py-2 rounded hover:opacity-90" style={{color: 'var(--primary-blue)', backgroundColor: 'transparent'}}>Login</button>
        <button className="px-4 py-2 text-white rounded hover:opacity-90" style={{backgroundColor: 'var(--primary-blue)'}}>Sign Up</button>
      </div>
    </header>
  );
}