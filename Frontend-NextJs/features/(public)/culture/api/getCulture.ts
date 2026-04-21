import { fetchSheet } from '@/features/(public)/culture/services/culture.service';
import { mapCulture } from '@/utils/culture.mapper';

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
