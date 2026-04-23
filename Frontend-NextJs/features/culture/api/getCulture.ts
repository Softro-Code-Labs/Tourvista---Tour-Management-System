import { fetchSheet } from '@/features/culture/services/culture.service';
import { mapCulture } from '@/features/culture/utils/culture.mapper';

export async function getCulture() {
  const [sectionsRes, placesRes, imagesRes] = await Promise.all([
    fetchSheet('sections'),
    fetchSheet('places'),
    fetchSheet('placeImages'),
  ]);

  return mapCulture(
    sectionsRes.sections,
    placesRes.places,
    imagesRes.placeImages,
  );
}
