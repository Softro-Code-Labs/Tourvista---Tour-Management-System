import SectionTitle from '../../../components/sections/SectionTitle';
import CultureUserList from '@/features/culture/components/CultureUserList';

export const metadata = {
  title: 'Local Culture & Heritage | The Soul of Sri Lanka | Tourvista Tours',
  description:
    'Immerse yourself in the vibrant traditions, sacred arts, and 2,500-year history of Sri Lanka. Explore colorful festivals, traditional crafts, and UNESCO World Heritage sites with Tourvista.',
  keywords: [
    'Sri Lanka cultural tours',
    'UNESCO heritage sites Sri Lanka',
    'Kandy Esala Perahera',
    'Traditional Sri Lankan crafts',
    'Sri Lanka religious festivals',
    'History of Sri Lanka guide',
  ],
  openGraph: {
    title: "Discover Sri Lanka's Rich Culture & Heritage | Tourvista Tours",
    description:
      'From ancient temples to traditional dance and artisan crafts, experience the authentic soul of the island.',
    url: 'https://tourvistatours.com/culture',
    siteName: 'Tourvista Tours',
    images: [
      {
        url: '/images/og-packages.png',
        width: 1200,
        height: 630,
        alt: 'Tourvista Tours Sri Lankan',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Lanka Culture & Heritage Guide',
    description:
      'Immerse yourself in the vibrant traditions and history of the island.',
    images: ['/images/og-packages.png'],
  },
};

export default function CulturePage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <SectionTitle
        title="Local Culture & Heritage"
        description="Immerse yourself in the vibrant traditions, arts, and history of Sri Lanka. Discover the soul of our island through its colorful festivals, traditional crafts, and historic landmarks. Experience the warmth and richness of our culture on your next adventure with Tourvista Tours."
      />

      <CultureUserList />
    </div>
  );
}
