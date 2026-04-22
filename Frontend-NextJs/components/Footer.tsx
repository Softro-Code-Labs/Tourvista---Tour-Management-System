'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t transition-colors duration-300 bg-white text-slate-900 border-gray-200 dark:bg-slate-950 dark:text-white dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <h2 className="text-xl font-semibold mb-3">TourVista</h2>

          <p className="text-sm text-slate-500 dark:text-white/50">
            Discover the beauty of Sri Lanka through unforgettable travel
            experiences, tours, and adventures.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-medium mb-3">Quick Links</h3>

          <ul className="space-y-2 text-sm text-slate-500 dark:text-white/60">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/attractions">Attractions</Link>
            </li>
            <li>
              <Link href="/culture">Culture</Link>
            </li>
            <li>
              <Link href="/tours">Tours</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="font-medium mb-3">Explore Sri Lanka</h3>

          <ul className="space-y-2 text-sm text-slate-500 dark:text-white/60">
            <li>Ella</li>
            <li>Sigiriya</li>
            <li>Kandy</li>
            <li>Galle</li>
            <li>Mirissa</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-medium mb-3">Contact</h3>

          <ul className="space-y-2 text-sm text-slate-500 dark:text-white/60">
            <li>Email: info@tourvista.com</li>
            <li>Phone: +94 77 123 4567</li>
            <li>Colombo, Sri Lanka</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-slate-500 dark:text-white/40">
            © 2026 TourVista. All rights reserved.
          </p>

          <div className="flex gap-5 mt-2 md:mt-0">
            <a
              href="#"
              className="text-slate-500 hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-slate-500 hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-slate-500 hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
