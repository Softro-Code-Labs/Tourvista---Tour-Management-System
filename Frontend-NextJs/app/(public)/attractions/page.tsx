import SectionTitle from '../../../components/sections/SectionTitle';
import AttractionsUserList from '@/features/attractions/components/AttractionsUserList';

export const metadata = {
  title: 'Top Attractions in Sri Lanka',
  description:
    "Explore Sri Lanka's must-visit landmarks. From the ancient Sigiriya Rock Fortress to the misty peaks of Ella, world-class Yala safaris, and the pristine beaches of Mirissa and Unawatuna.",
  keywords: [
    'Sri Lanka attractions',
    'must visit places in Sri Lanka',
    'Sigiriya Rock Fortress',
    'Ella Sri Lanka',
    'Yala National Park safari',
    'Sri Lanka beach vacations',
  ],
  alternates: {
    canonical: '/attractions',
  },
  openGraph: {
    title: 'Top Attractions in Sri Lanka | Tourvista Tours',
    description:
      'Discover the pearl of the Indian Ocean. A curated guide to the best fortresses, mountains, and beaches in Sri Lanka.',
    url: 'https://tourvistatours.com/attractions',
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
    title: 'Top Attractions in Sri Lanka | Tourvista Tours',
    description:
      'Explore Sigiriya, Ella, and the beautiful South Coast with Tourvista.',
    images: ['/images/og-packages.png'],
  },
};

export default async function AttractionsPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-16">
      <SectionTitle
        title="Top Attractions in Sri Lanka"
        description="Discover Sri Lank's most unforgettable destinations - ancient heritage sites, misty mountain escapes, stunning waterfalls, wildlife safaris, and golden tropical beaches waiting to be explored."
      />

      <AttractionsUserList />
    </div>
  );
}
