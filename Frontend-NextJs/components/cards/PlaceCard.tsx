'use client';

import Image from 'next/image';

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
  return (
    <div
      onClick={onClick}
      className="
        group relative rounded-2xl overflow-hidden cursor-pointer
        border transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        bg-white dark:bg-white/5
        border-gray-200 dark:border-white/10
      "
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
          className="
            absolute inset-0
            bg-gradient-to-t from-white/60 via-white/10 to-transparent
            dark:from-black/70 dark:via-black/20 dark:to-transparent
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3
          className="
            text-lg font-semibold transition
            text-slate-900 dark:text-white
            group-hover:text-blue-600 dark:group-hover:text-cyan-300
          "
        >
          {title}
        </h3>

        <p className="text-sm mt-2 leading-relaxed text-slate-500 dark:text-white/60">
          {description}
        </p>

        {/* indicator line */}
        <div
          className="
            mt-4 h-[2px] w-0 group-hover:w-full
            transition-all duration-500 rounded-full
            bg-gradient-to-r from-blue-500 to-indigo-500
            dark:from-cyan-400 dark:to-blue-500
          "
        />
      </div>
    </div>
  );
}
