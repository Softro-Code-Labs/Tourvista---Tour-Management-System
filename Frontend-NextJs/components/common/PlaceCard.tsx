'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

type Place = {
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
};

export default function PlaceCard({
  title,
  description,
  image,
  onClick,
}: Place) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      className={`
        group relative rounded-2xl overflow-hidden cursor-pointer
        border transition-all duration-300

        hover:-translate-y-1 hover:shadow-xl

        ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}
      `}
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="
            h-full w-full object-cover
            scale-105 group-hover:scale-110
            transition-transform duration-700
          "
        />

        {/* OVERLAY */}
        <div
          className={`
            absolute inset-0
            ${
              isDark
                ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
                : 'bg-gradient-to-t from-white/60 via-white/10 to-transparent'
            }
          `}
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3
          className={`
            text-lg font-semibold transition
            ${
              isDark
                ? 'text-white group-hover:text-cyan-300'
                : 'text-slate-900 group-hover:text-blue-600'
            }
          `}
        >
          {title}
        </h3>

        <p
          className={`
            text-sm mt-2 leading-relaxed
            ${isDark ? 'text-white/60' : 'text-slate-500'}
          `}
        >
          {description}
        </p>

        {/* subtle indicator line */}
        <div
          className={`
            mt-4 h-[2px] w-0 group-hover:w-full
            transition-all duration-500 rounded-full

            ${
              isDark
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500'
            }
          `}
        />
      </div>
    </div>
  );
}
