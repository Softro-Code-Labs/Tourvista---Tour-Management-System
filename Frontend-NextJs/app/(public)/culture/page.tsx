import { getCulture } from '@/features/culture/api/getCulture';
import SectionTitle from '../../../components/common/SectionTitle';
import PlaceSection from '@/components/common/PlaceSection';

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

const cultureData = await getCulture();

export default function Culture() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <SectionTitle
        title="Local Culture & Heritage"
        description="Immerse yourself in the vibrant traditions, arts, and history of Sri Lanka. Discover the soul of our island through its colorful festivals, traditional crafts, and historic landmarks. Experience the warmth and richness of our culture on your next adventure with TourVista."
      />

      {cultureData.map((section) => (
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
