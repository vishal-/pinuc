export default function Footer() {
  return (
    <footer className="py-6 sm:py-8 px-4" style={{backgroundColor: 'var(--dark-gray)', color: 'var(--soft-white)'}}>
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-8">
        <a href="#" className="text-sm sm:text-base hover:opacity-80" style={{color: 'var(--soft-white)'}}>About</a>
        <a href="#" className="text-sm sm:text-base hover:opacity-80" style={{color: 'var(--soft-white)'}}>Terms</a>
        <a href="#" className="text-sm sm:text-base hover:opacity-80" style={{color: 'var(--soft-white)'}}>Privacy</a>
        <a href="#" className="text-sm sm:text-base hover:opacity-80" style={{color: 'var(--soft-white)'}}>Contact</a>
      </div>
    </footer>
  );
}