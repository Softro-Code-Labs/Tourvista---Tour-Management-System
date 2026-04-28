import type { Section } from '@/features/tours/types/tours.types';

type RawSection = {
  sectionId: number;
  title: string;
  emoji: string;
  description: string;
};

type RawPlace = {
  placeId: number;
  sectionId: number;
  title: string;
  description: string;
  imageUrl: string;
};

type RawImage = {
  placeId: number;
  imageUrl: string;
};

export function mapTours(
  rawSections: RawSection[],
  rawPlaces: RawPlace[],
  rawImages: RawImage[],
): Section[] {
  return rawSections.map((section) => {
    const places = rawPlaces
      .filter((place) => place.sectionId === section.sectionId)
      .map((place) => {
        const images = rawImages
          .filter((img) => img.placeId === place.placeId)
          .map((img) => img.imageUrl);

        return {
          title: place.title,
          description: place.description,
          image: place.imageUrl,
          images: images,
        };
      });

    return {
      section: `${section.emoji} ${section.title}`,
      description: section.description,
      places: places,
    };
  });
}
