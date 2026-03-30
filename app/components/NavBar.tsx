'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Glass container */}
      <div className="backdrop-blur-md bg-white/70 border-b border-white/30 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="TourVista Logo"
              width={180}
              height={180}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link
              href="/attractions"
              className="hover:text-blue-600 transition"
            >
              Attractions
            </Link>
            <Link href="/culture" className="hover:text-blue-600 transition">
              Culture
            </Link>
            <Link href="/tours" className="hover:text-blue-600 transition">
              Tours
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </nav>

          {/* Mobile button */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-gray-700">
            <Link href="/">Home</Link>
            <Link href="/attractions">Attractions</Link>
            <Link href="/culture">Culture</Link>
            <Link href="/tours">Tours</Link>
            <Link href="/contact">Contact</Link>
          </div>
        )}
      </div>
    </header>
  );
}
