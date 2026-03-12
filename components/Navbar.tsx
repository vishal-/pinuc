import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            LocalHub
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/services/home-repair"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Services
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Locations
            </Link>
            <Link
              href="/join-as-provider"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Join as Provider
            </Link>
          </div>

          <div className="md:hidden">
            <Link
              href="/join-as-provider"
              className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
            >
              Join
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
