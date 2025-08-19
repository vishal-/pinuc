export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b" style={{backgroundColor: 'var(--soft-white)', borderColor: 'var(--warm-neutral)'}}>
      <div className="text-xl sm:text-2xl font-bold" style={{color: 'var(--primary-blue)'}}>ServiceHub</div>
      <div className="flex gap-2 sm:gap-4">
        <button className="px-3 py-2 text-sm sm:px-4 sm:text-base rounded hover:opacity-90" style={{color: 'var(--primary-blue)', backgroundColor: 'transparent'}}>Login</button>
        <button className="px-3 py-2 text-sm sm:px-4 sm:text-base text-white rounded hover:opacity-90" style={{backgroundColor: 'var(--primary-blue)'}}>Sign Up</button>
      </div>
    </header>
  );
}