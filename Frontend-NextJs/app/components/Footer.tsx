import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">TourVista</h2>
          <p className="text-gray-400 text-sm">
            Discover the beauty of Sri Lanka through unforgettable travel
            experiences, tours, and adventures.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
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

        {/* Explore */}
        <div>
          <h3 className="font-semibold mb-3">Explore Sri Lanka</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Ella</li>
            <li>Sigiriya</li>
            <li>Kandy</li>
            <li>Galle</li>
            <li>Mirissa</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Email: info@tourvista.com</li>
            <li>Phone: +94 77 123 4567</li>
            <li>Colombo, Sri Lanka</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 TourVista. All rights reserved.</p>

          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
