'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-xl">
        {/* big 404 */}
        <h1 className="text-7xl font-extrabold text-blue-600">404</h1>

        {/* title */}
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-900">
          Page Not Found
        </h2>

        {/* description */}
        <p className="text-gray-600 mt-3">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-500 hover:to-indigo-500 transition"
          >
            Go Home 🏠
          </button>

          <button
            onClick={() => router.push('/contact')}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Contact Us ✉️
          </button>
        </div>
      </div>
    </section>
  );
}
