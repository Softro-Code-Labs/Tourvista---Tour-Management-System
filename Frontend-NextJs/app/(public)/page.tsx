import SectionDivider from '@/components/sections/SectionDivider';
import SectionTitle from '../../components/sections/SectionTitle';
import Hero from '../../components/sections/Hero';
import Link from 'next/link';
import { ShieldCheck, Heart, GraduationCap, Clock, Star } from 'lucide-react';
import { BrandIcons } from '@/components/Icons';
import ReviewList from '@/features/reviews/components/ReviewList';

export const metadata = {
  title: 'Tourvista Tours | Premier Sri Lanka Tours & Tailor-Made Travel',
  description:
    'Experience the wonder of Sri Lanka with Tourvista. From the misty mountains of Ella to the golden beaches of Mirissa, we offer curated travel guides and luxury tours for international travelers.',
  keywords: [
    'Sri Lanka travel packages',
    'Best Sri Lanka tours 2026',
    'Sri Lanka private driver',
    'luxury travel Sri Lanka',
    'Sri Lanka sightseeing',
    'cultural tours Sri Lanka',
  ],
  authors: [{ name: 'Tourvista Tours' }],
  openGraph: {
    title: 'Explore Sri Lanka with Tourvista Tours',
    description:
      'Discover unforgettable destinations and authentic experiences in the pearl of the Indian Ocean.',
    url: 'https://tourvistatours.com',
    siteName: 'Tourvista Tours',
    images: [
      {
        url: 'https://tourvistatours.com/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Tourvista Tours Sri Lanka',
      },
    ],
    locale: 'si-LK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tourvista Tours | Explore Sri Lanka',
    description: 'Curated Sri Lankan travel experiences and luxury tours.',
    images: ['https://tourvistatours.com/logo.webp'],
  },
};

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* 1. FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/94742928036"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[99] flex items-center gap-3 bg-[#25D366] text-white p-3 md:px-5 md:py-3.5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-all group"
      >
        <span className="hidden md:block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
          Need help? WhatsApp us
        </span>
        <div className="w-6 h-6">
          <BrandIcons.WhatsApp />
        </div>
      </a>

      <Hero />

      {/* CATEGORIES */}
      <section className="container mx-auto px-6 py-16">
        <SectionTitle
          title="Travel Categories"
          description="Choose your travel style"
          size="lg"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {['Adventure', 'Cultural', 'Wildlife', 'Beaches'].map((cat) => (
            <div
              key={cat}
              className="group p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02] text-center hover:border-blue-500 transition-all cursor-pointer"
            >
              <p className="font-bold text-gray-900 dark:text-white">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* WHY CHOOSE US */}
      <section className="container mx-auto px-6 py-16">
        <SectionTitle
          title="Why Choose Tourvista Tours?"
          description="We believe travelers seek happiness, experience, and education. We provide these with care, safety, and honesty at the right time."
          variant="muted"
          size="lg"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <FeatureItem
            icon={<Heart className="text-rose-500" />}
            title="Care"
            desc="Personalized attention to every traveler's unique needs."
          />
          <FeatureItem
            icon={<ShieldCheck className="text-emerald-500" />}
            title="Safe"
            desc="Your security is our priority with verified transport and guides."
          />
          <FeatureItem
            icon={<GraduationCap className="text-blue-500" />}
            title="Education"
            desc="Deep insights into Sri Lankan history and local culture."
          />
          <FeatureItem
            icon={<Clock className="text-amber-500" />}
            title="Right Time"
            desc="Punctual execution and perfectly timed itineraries."
          />
        </div>
      </section>

      <SectionDivider />

      <ReviewList />

      <SectionDivider />

      {/* CTA SECTION */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto p-12 rounded-[3rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">
            Ready to plan your dream trip? 🌍
          </h2>

          <p className="text-gray-600 dark:text-slate-400 mb-10 text-lg relative z-10">
            Let's create your perfect travel experience today.
          </p>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 dark:bg-blue-500 text-white font-bold hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all relative z-10"
          >
            Plan My Trip <span className="text-xl">✈️</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-3xl transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 shadow-sm flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
