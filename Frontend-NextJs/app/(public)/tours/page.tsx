import { getTours } from '@/features/tours/api/getTours';
import SectionTitle from '../../../components/sections/SectionTitle';
import PlaceSection from '@/components/sections/PlaceSection';

export const metadata = {
  title: 'Tours & Activities | Curated Sri Lankan Adventures | Tourvista Tours',
  description:
    'Experience the best of Sri Lanka. From the misty peaks of Ella to kayaking in Bentota and historic city walks. Book your authentic Sri Lankan tour with Tourvista today.',
  keywords: [
    'Best Sri Lanka tour packages 2026',
    'Sri Lanka adventure activities',
    'Hiking tours Sri Lanka',
    'Water sports Sri Lanka',
    'Guided sightseeing tours',
    'Sri Lanka holiday packages',
  ],
  openGraph: {
    title: 'Unforgettable Tours & Activities in Sri Lanka | Tourvista Tours',
    description:
      'Adventure, culture, and nature. Explore our handpicked Sri Lankan experiences.',
    url: 'https://tourvistatours.com/tours',
    siteName: 'Tourvista Tours',
    images: [
      {
        url: '/images/og-packages.png',
        width: 1200,
        height: 630,
        alt: 'Tourvista Tours Sri Lanka',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Lanka Tours & Activities | Unforgettable Experiences',
    description:
      'Book your next adventure in Sri Lanka. From hiking and kayaking to cultural city walks.',
    images: ['/images/og-packages.png'],
  },
};

export default async function Tours() {
  const toursData = await getTours();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <SectionTitle
        title="Tours & Activities"
        description="Explore a variety of exciting tours and activities designed to showcase the best of Sri Lanka. Whether you're seeking adventure, cultural experiences, or scenic beauty, our tours offer something for everyone. Join us for unforgettable memories and unique experiences."
      />

      {toursData.map((section) => (
        <PlaceSection
          key={section.section}
          title={section.section}
          description={section.description}
          places={section.places}
        />
      ))}
    </div>
  );
}
