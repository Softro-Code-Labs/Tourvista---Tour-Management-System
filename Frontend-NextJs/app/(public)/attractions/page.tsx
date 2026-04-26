import { getAttractions } from '@/features/attractions/api/getAttractions';
import SectionTitle from '../../../components/sections/SectionTitle';
import PlaceSection from '@/components/sections/PlaceSection';

export const metadata = {
  title: 'Top Attractions in Sri Lanka | Iconic Landmarks & Hidden Gems',
  description:
    "Explore Sri Lanka's must-visit landmarks. From the ancient Sigiriya Rock Fortress to the misty peaks of Ella, world-class Yala safaris, and the pristine beaches of Mirissa and Unawatuna. Plan your sightseeing with Tourvista Tours.",
  keywords: [
    'Must visit places in Sri Lanka',
    'Sigiriya Rock Fortress guide',
    'Ella Sri Lanka travel',
    'Yala National Park safari 2026',
    'Sri Lanka beach vacations',
    'Best waterfalls in Sri Lanka',
    'Nine Arch Bridge Ella',
    'Diyaluma Falls hiking',
  ],
  openGraph: {
    title: 'Iconic Sri Lankan Attractions | Explore with Tourvista',
    description:
      'Discover the pearl of the Indian Ocean. A curated guide to the best fortresses, mountains, and beaches in Sri Lanka.',
    url: 'https://tourvistatours.com/attractions',
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
    title: 'Sri Lanka Attractions | The Ultimate Sightseeing Guide',
    description:
      'Explore Sigiriya, Ella, and the beautiful South Coast with Tourvista.',
    images: ['/images/og-packages.png'],
  },
};

export default async function Attractions() {
  const attractionsData = await getAttractions();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-16">
      <SectionTitle
        title="Top Attractions in Sri Lanka"
        description="Discover Sri Lank's most unforgettable destinations - ancient heritage sites, misty mountain escapes, stunning waterfalls, wildlife safaris, and golden tropical beaches waiting to be explored."
      />

      {attractionsData.map((section) => (
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
