import SectionDivider from '@/components/common/SectionDivider';
import SectionTitle from '../../components/common/SectionTitle';
import Hero from '../../components/Hero';
import Link from 'next/link';

export const metadata = {
  title: 'TourVista Tours | Explore Sri Lanka Tours & Destinations',
  description:
    'Discover Sri Lanka with TourVista. Explore top destinations, travel guides, and unforgettable tours for international travelers.',
  keywords: [
    'Sri Lanka travel',
    'Sri Lanka tours',
    'visit Sri Lanka',
    'Sri Lanka destinations',
    'Sri Lanka itinerary',
  ],
};

export default function Home() {
  return (
    <div>
      <Hero />

      {/* FEATURED DESTINATIONS */}
      <section>
        <SectionTitle
          title="Popular Destinations"
          description="Explore the most beautiful places in Sri Lanka"
          variant="muted"
          size="lg"
        />

        <div className="grid md:grid-cols-3 gap-6">{/* Cards */}</div>
      </section>
      <SectionDivider />

      {/* CATEGORIES */}
      <section>
        <SectionTitle
          title="Travel Categories"
          description="Choose your travel style"
          size="lg"
        />

        <div className="grid md:grid-cols-4 gap-6">{/* category cards */}</div>
      </section>
      <SectionDivider />

      {/* WHTY CHOOSE US */}
      <section>
        <SectionTitle
          title="Why Should You Choose Tourvista Tours?"
          description="You tourist travel for hapiness, experience, and education therfore Tourvista Tours does best to give those to the travellers with care, safe and honest at the right time."
          variant="muted"
          size="lg"
        />

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {/* features */}
        </div>
      </section>
      <SectionDivider />

      {/* CTA SECTION */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to plan your dream trip? 🌍
        </h2>

        <p className="text-gray-600 mb-6">
          Let's create your perfect travel experience today.
        </p>

        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-500 hover:to-indigo-500 transition"
        >
          Plan My Trip ✈️
        </Link>
      </section>
    </div>
  );
}
