import { fetchSheet } from '@/features/tours/services/tours.service';
import { mapTours } from '@/features/tours/utils/tours.mapper';

export async function getTours() {
  const [sectionsRes, placesRes, imagesRes] = await Promise.all([
    fetchSheet('sections'),
    fetchSheet('places'),
    fetchSheet('placeImages'),
  ]);

  return mapTours(
    sectionsRes.sections,
    placesRes.places,
    imagesRes.placeImages,
  );
}
