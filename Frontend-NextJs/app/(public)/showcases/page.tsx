import SectionTitle from '../../../components/sections/SectionTitle';
import ShowcasesUserList from '@/features/showcases/components/ShowcasesUserList';

export const metadata = {
  title: 'Sri Lanka Tours & Activities',
  description:
    'Experience the best of Sri Lanka. From the misty peaks of Ella to kayaking in Bentota and historic city walks. Book your authentic Sri Lankan tour with Tourvista today.',
  keywords: [
    'Sri Lanka tours',
    'best Sri Lanka tour packages',
    'Sri Lanka adventure activities',
    'hiking tours Sri Lanka',
    'guided sightseeing tours Sri Lanka',
  ],
  alternates: {
    canonical: '/showcases',
  },
  openGraph: {
    title: 'Sri Lanka Tours & Activities | Tourvista Tours',
    description:
      'Adventure, culture, and nature. Explore our handpicked Sri Lankan experiences.',
    url: 'https://tourvistatours.com/showcases',
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
    title: 'Sri Lanka Tours & Activities | Tourvista Tours',
    description:
      'Book your next adventure in Sri Lanka. From hiking and kayaking to cultural city walks.',
    images: ['/images/og-packages.png'],
  },
};

export default async function ShowcasesPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <SectionTitle
        title="Tours & Activities"
        description="Explore a variety of exciting tours and activities designed to showcase the best of Sri Lanka. Whether you're seeking adventure, cultural experiences, or scenic beauty, our tours offer something for everyone. Join us for unforgettable memories and unique experiences."
      />

      <ShowcasesUserList />
    </div>
  );
}
