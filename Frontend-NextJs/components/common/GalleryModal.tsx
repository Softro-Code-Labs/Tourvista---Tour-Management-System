'use client';

import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface GalleryModalProps {
  title: string;
  images: string[];
  onClose: () => void;
}

export default function GalleryModal({
  title,
  images,
  onClose,
}: GalleryModalProps) {
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // 1. Handle Mounting for Portals (Next.js SSR safe)
  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden'; // Lock scroll
    return () => {
      document.body.style.overflow = 'unset';
    }; // Unlock scroll
  }, []);

  const handleNext = useCallback(() => {
    if (active !== null) setActive((active + 1) % images.length);
  }, [active, images.length]);

  const handlePrev = useCallback(() => {
    if (active !== null)
      setActive((active - 1 + images.length) % images.length);
  }, [active, images.length]);

  // 2. Keyboard Navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') active !== null ? setActive(null) : onClose();
      if (active !== null) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, onClose, handleNext, handlePrev]);

  if (!mounted) return null;

  // 3. Component Content
  const content = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-300">
      {/* GLOBAL HEADER */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[110]">
        <h2 className="text-white font-medium tracking-wide opacity-80">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-90"
        >
          <X size={24} />
        </button>
      </div>

      {/* GRID VIEW */}
      {active === null ? (
        <div className="w-full max-w-6xl max-h-[80vh] overflow-y-auto px-6 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group border border-white/5"
              >
                <Image
                  src={img}
                  alt={`${title} view ${i}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-bold tracking-widest uppercase">
                    View Large
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* FULLSCREEN VIEW */
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 lg:p-12">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 lg:left-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 lg:right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
          >
            <ChevronRight size={32} />
          </button>

          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            <Image
              src={images[active]}
              alt="Fullscreen"
              fill
              className="object-contain animate-in zoom-in-95 duration-300"
            />
          </div>

          {/* FOOTER CONTROLS */}
          <div className="absolute bottom-8 w-full flex flex-col items-center gap-6">
            <div className="flex gap-2 overflow-x-auto max-w-[90vw] p-2 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                    i === active
                      ? 'ring-2 ring-blue-500 scale-110'
                      : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActive(null)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold cursor-pointer transition-all"
            >
              <Grid size={18} /> Back to Gallery
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
}
