'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  images: string[];
  onClose: () => void;
};

export default function GalleryModal({ title, images, onClose }: Props) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (active !== null) setActive(null);
        else onClose();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, onClose]);

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        backdrop-blur-lg transition-all duration-300
        bg-black/70 dark:bg-black/90
      "
    >
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="
          absolute top-6 right-6 z-50 p-2 rounded-full cursor-pointer transition
          bg-black/10 hover:bg-black/20
          dark:bg-white/10 dark:hover:bg-white/20
        "
      >
        <X className="text-black dark:text-white" />
      </button>

      {/* GRID VIEW */}
      {active === null && (
        <div
          className="
            w-[95%] max-w-6xl max-h-[85vh] overflow-y-auto
            rounded-2xl p-5 shadow-2xl transition-all duration-300
            bg-white text-gray-900
            dark:bg-[#0B1120] dark:text-white
          "
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className="relative h-40 md:h-52 rounded-xl overflow-hidden cursor-pointer group"
              >
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div
                  className="
                    absolute inset-0 transition
                    bg-white/20 opacity-0 group-hover:opacity-100
                    dark:bg-black/30
                  "
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULLSCREEN VIEW */}
      {active !== null && (
        <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
          <div className="relative w-full max-w-6xl h-[75vh]">
            <Image
              src={images[active]}
              alt=""
              fill
              className="object-contain transition duration-500"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-6 overflow-x-auto max-w-5xl w-full px-2">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`
                  relative min-w-[90px] h-16 rounded-lg overflow-hidden cursor-pointer border transition
                  ${
                    i === active
                      ? 'border-blue-500 scale-105'
                      : 'border-gray-300 opacity-70 hover:opacity-100 dark:border-white/10'
                  }
                `}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>

          <button
            onClick={() => setActive(null)}
            className="
              mt-6 px-5 py-2 rounded-lg cursor-pointer transition
              bg-gray-200 text-gray-800 hover:bg-gray-300
              dark:bg-white/10 dark:text-white dark:hover:bg-white/20
            "
          >
            Back to Gallery
          </button>
        </div>
      )}
    </div>
  );
}
