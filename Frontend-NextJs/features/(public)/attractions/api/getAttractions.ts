import { fetchSheet } from '@/features/(public)/attractions/services/attractions.service';
import { mapAttractions } from '@/utils/attractions.mapper';

export async function getAttractions() {
  const [sectionsRes, placesRes, imagesRes] = await Promise.all([
    fetchSheet('sections'),
    fetchSheet('places'),
    fetchSheet('placeImages'),
  ]);

  return mapAttractions(
    sectionsRes.sections,
    placesRes.places,
    imagesRes.placeImages,
  );
}
