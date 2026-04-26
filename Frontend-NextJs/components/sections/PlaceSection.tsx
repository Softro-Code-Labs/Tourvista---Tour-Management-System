'use client';

import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import GalleryModal from '../common/GalleryModal';
import PlaceCard from '../cards/PlaceCard';

interface Place {
  title: string;
  description: string;
  image: string;
  images?: string[];
}

interface PlaceSectionProps {
  title: string;
  description: string;
  places: Place[];
}

export default function PlaceSection({
  title,
  description,
  places,
}: PlaceSectionProps) {
  const [selected, setSelected] = useState<Place | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="group/section">
      {/* HEADER BLOCK */}
      <div className="mb-8 space-y-4">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between cursor-pointer group/title"
        >
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors">
              {title}
            </h2>
            <div className="h-1 w-12 bg-blue-600 rounded-full transition-all group-hover/title:w-24" />
          </div>

          <button className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-blue-600 transition-all">
            <ChevronDown
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* ELEGANT DESCRIPTION REVEAL */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <div className="flex gap-3 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
              <Info
                className="shrink-0 text-blue-600 dark:text-blue-400"
                size={20}
              />
              <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {places.map((place, i) => (
          <div
            key={`${place.title}-${i}`}
            className="transform transition-all duration-500"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <PlaceCard {...place} onClick={() => setSelected(place)} />
          </div>
        ))}
      </div>

      {/* MODAL SYSTEM */}
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
