import PlaceCard from '../components/common/PlaceCard';
import SectionTitle from '../components/common/SectionTitle';

export const metadata = {
  title: 'Local Culture & Heritage | TourVista Sri Lanka',
  description:
    'Immerse yourself in the vibrant traditions, arts, and history of Sri Lanka. Discover the soul of our island through its colorful festivals, traditional crafts, and historic landmarks.',
  keywords: [
    'Sri Lanka culture',
    'Sri Lanka heritage',
    'Sri Lanka festivals',
    'Sri Lanka crafts',
    'Sri Lanka history',
  ],
};

const cultureData = [
  {
    title: 'Colorful Festivals',
    description:
      'Experience traditional celebrations and local customs full of music and dance.',
    image: './images/culture1.webp',
  },
  {
    title: 'Traditional Crafts',
    description:
      'Discover handmade arts and crafts reflecting our rich heritage and artistry.',
    image: './images/culture2.webp',
  },
  {
    title: 'Historic Landmarks',
    description:
      'Visit centuries-old buildings, temples, and monuments that tell the story of our past.',
    image: './images/culture3.webp',
  },
];

export default function Culture() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <SectionTitle
        title="Local Culture & Heritage"
        description="Immerse yourself in the vibrant traditions, arts, and history of Sri Lanka. Discover the soul of our island through its colorful festivals, traditional crafts, and historic landmarks. Experience the warmth and richness of our culture on your next adventure with TourVista."
      />

      <div className="grid md:grid-cols-3 gap-6">
        {cultureData.map((item, i) => (
          <PlaceCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
