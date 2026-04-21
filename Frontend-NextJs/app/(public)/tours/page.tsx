import { getTours } from '@/features/(public)/tours/api/getTours';
import SectionTitle from '../../../components/common/SectionTitle';
import PlaceSection from '@/components/common/PlaceSection';

export const metadata = {
  title: 'Tours & Activities | TourVista Sri Lanka',
  description:
    'Discover exciting tours and activities in Sri Lanka with TourVista. Explore mountain hiking, kayaking adventures, city sightseeing, and more for unforgettable travel experiences.',
  keywords: [
    'Sri Lanka tours',
    'Sri Lanka activities',
    'mountain hiking',
    'kayaking adventure',
    'city sightseeing',
  ],
};

const toursData = await getTours();

export default function Tours() {
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
