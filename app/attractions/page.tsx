import PlaceCard from '../components/common/PlaceCard';
import SectionTitle from '../components/common/SectionTitle';

const attractions = [
  {
    title: 'Scenic Mountain View',
    description:
      'Enjoy breathtaking mountain landscapes and hiking trails suitable for all levels.',
    image: './images/attraction1.jpg',
  },
  {
    title: 'Historic City Center',
    description:
      'Walk through centuries of history in our beautifully preserved city center.',
    image: './images/attraction2.jpg',
  },
  {
    title: 'Beach Paradise',
    description:
      'Relax on pristine beaches with golden sand and crystal-clear waters.',
    image: './images/attraction3.jpg',
  },
];

export default function Attractions() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <SectionTitle
        title="Top Attractions"
        description=" Discover the most popular destinations in Sri Lanka. From stunning mountain views to historic landmarks, explore the best attractions to visit. Join us for unforgettable experiences and unforgettable memories."
      />

      <div className="grid md:grid-cols-3 gap-6">
        {attractions.map((item, i) => (
          <PlaceCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
