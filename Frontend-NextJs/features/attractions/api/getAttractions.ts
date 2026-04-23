import { fetchSheet } from '@/features/attractions/services/attractions.service';
import { mapAttractions } from '@/features/attractions/utils/attractions.mapper';

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
