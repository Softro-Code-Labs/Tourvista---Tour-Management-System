import PlaceCard from '../components/common/PlaceCard';
import SectionTitle from '../components/common/SectionTitle';

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

const tours = [
  {
    title: 'Mountain Hiking',
    description:
      'Explore scenic trails with varying difficulty levels and breathtaking views.',
    image: './images/tour1.webp',
  },
  {
    title: 'Kayaking Adventure',
    description:
      'Enjoy water sports on rivers and lakes surrounded by stunning nature.',
    image: './images/tour2.webp',
  },
  {
    title: 'City Sightseeing',
    description:
      "Discover the city's landmarks, local markets, and hidden gems with guided tours.",
    image: './images/tour3.webp',
  },
];

export default function Tours() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <SectionTitle
        title="Tours & Activities"
        description="Explore a variety of exciting tours and activities designed to showcase the best of Sri Lanka. Whether you're seeking adventure, cultural experiences, or scenic beauty, our tours offer something for everyone. Join us for unforgettable memories and unique experiences."
      />

      <div className="grid md:grid-cols-3 gap-6">
        {tours.map((item, i) => (
          <PlaceCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
