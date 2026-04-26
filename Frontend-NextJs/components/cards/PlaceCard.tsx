'use client';

import Image from 'next/image';

type Place = {
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
};

interface PlaceCardProps extends Place {
  onClick?: () => void;
  className?: string;
}

export default function PlaceCard({
  title,
  description,
  image,
  onClick,
  className = '',
}: PlaceCardProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className={`
        group relative rounded-2xl overflow-hidden cursor-pointer
        border bg-white dark:bg-white/[0.03]
        border-slate-200 dark:border-white/10
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none
        ${className}
      `}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Image
          src={image}
          alt={`Visual of ${title}`}
          fill
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          className="
            object-cover scale-105 
            group-hover:scale-110 group-hover:rotate-1
            transition-transform duration-1000 ease-in-out
          "
        />

        {/* ADAPTIVE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 dark:opacity-80" />

        {/* TOP BADGE (Industrial touch) */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
            <p className="text-[10px] text-white font-bold uppercase tracking-widest">
              Explore
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-6">
        <h3
          className="
          text-xl font-bold tracking-tight transition-colors duration-300
          text-slate-900 dark:text-white
          group-hover:text-blue-600 dark:group-hover:text-cyan-300
        "
        >
          {title}
        </h3>

        <p className="text-sm mt-3 leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
          {description}
        </p>

        {/* PROGRESS INDICATOR */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-[2px] flex-1 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
            <div className="h-full w-0 group-hover:w-full transition-all duration-700 ease-in-out bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-cyan-400 dark:to-blue-500" />
          </div>
          <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity delay-300">
            VIEW
          </span>
        </div>
      </div>
    </div>
  );
}
