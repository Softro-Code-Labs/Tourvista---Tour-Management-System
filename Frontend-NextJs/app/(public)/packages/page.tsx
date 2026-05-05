import { Metadata } from 'next';
import PackagesList from '@/features/packages/components/PackagesList';

export const metadata: Metadata = {
  title: 'Luxury Tour Packages | TourVista Sri Lanka',
  description:
    'Experience the soul of Sri Lanka with our curated collection of premium tour packages. From misty tea mountains to golden coastal escapes.',
  keywords: [
    'Sri Lanka Tours',
    'Luxury Travel Sri Lanka',
    'Tour Packages',
    'Tourvista Tours',
  ],
  authors: [{ name: 'TourVista' }],
  openGraph: {
    title: 'Luxury Tour Packages | TourVista Sri Lanka',
    description:
      'Explore handcrafted Sri Lankan adventures designed for the modern traveler.',
    url: 'https://tourvistatours.com/packages',
    siteName: 'Tourvista Tours Sri Lanka',
    images: [
      {
        url: '/images/og-packages.png',
        width: 1200,
        height: 630,
        alt: 'TourVista Premium Packages',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Tour Packages | TourVista Sri Lanka',
    description: 'Curated adventures across the paradise island.',
    images: ['/images/og-packages.png'],
  },
};

export default function PackagesPage() {
  return (
    <main className="relative min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pt-40 pb-32 overflow-hidden">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="max-w-4xl mb-24 space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Collection {new Date().getFullYear()} is Live
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-black text-slate-900 dark:text-white tracking-[ -0.05em] leading-[0.8]">
              Premium <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400">
                Packages.
              </span>
            </h1>
            <p className="max-w-xl text-lg font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              Experience the soul of Sri Lanka with our curated collection of
              premium tour packages. From misty tea mountains to golden coastal
              escapes, each adventure is designed to immerse you in the island's
              unparalleled beauty and culture.
            </p>
          </div>
        </div>

        {/* MAIN LIST */}
        <section className="relative">
          <PackagesList />
        </section>
      </div>
    </main>
  );
}
