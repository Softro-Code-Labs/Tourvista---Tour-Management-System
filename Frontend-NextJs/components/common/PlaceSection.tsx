'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import GalleryModal from './GalleryModal';
import PlaceCard from './PlaceCard';

type Place = {
  title: string;
  description: string;
  image: string;
  images?: string[];
};

type Props = {
  title: string;
  description: string;
  places: Place[];
};

export default function PlaceSection({ title, description, places }: Props) {
  const [selected, setSelected] = useState<Place | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="space-y-6">
      {/* TITLE BLOCK */}
      <div className="space-y-2">
        <h2
          className={`text-2xl font-bold cursor-pointer transition-colors
            ${isDark ? 'text-white' : 'text-gray-900'}`}
          onMouseEnter={() => setShowDescription(true)}
          onMouseLeave={() => setShowDescription(false)}
          onClick={() => setShowDescription((v) => !v)}
        >
          {title}
        </h2>

        {/* INLINE DESCRIPTION */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out
            ${showDescription ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <p
            className={`text-sm leading-relaxed
              ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* CARD GRID */}
      <div className="mb-24 grid md:grid-cols-3 gap-6">
        {places.map((place, i) => (
          <PlaceCard key={i} {...place} onClick={() => setSelected(place)} />
        ))}
      </div>

      {/* MODAL */}
      {selected?.images && (
        <GalleryModal
          title={selected.title}
          images={selected.images}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
