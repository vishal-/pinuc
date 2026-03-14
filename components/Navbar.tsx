"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "./ui/button";

export function Navbar() {
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            LocalHub
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
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

            {user ? (
              <>
                <Link
                  href="/join-as-provider"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Become Provider
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{user.email}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/join-as-provider"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Join as Provider
                </Link>
                <Link href="/auth">
                  <Button size="sm">Sign In</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link href="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
