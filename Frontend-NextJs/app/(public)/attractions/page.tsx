import { getAttractions } from '@/features/attractions/api/getAttractions';
import SectionTitle from '../../../components/common/SectionTitle';
import PlaceSection from '@/components/common/PlaceSection';

export const metadata = {
  title: 'Top Attractions in Sri Lanka | Sigiriya, Ella, Waterfalls & Beaches',
  description:
    "Discover Sri Lanka's most iconic attractions including Sigiriya Rock Fortress, Ella's scenic mountains, Nine Arch Bridge, Yala National Park safaris, Mirissa and Unawatuna beaches, and stunning waterfalls like Diyaluma and Ravana Falls.",
  keywords: [
    'Sri Lanka travel',
    'Sri Lanka attractions',
    'Sigiriya Rock Fortress',
    'Ella Sri Lanka',
    'Nine Arch Bridge',
    'Yala National Park safari',
    'Mirissa Beach',
    'Unawatuna Beach',
    'Diyaluma Falls',
    'Ravana Falls',
  ],
};

const attractionsData = await getAttractions();

export default function Attractions() {
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
