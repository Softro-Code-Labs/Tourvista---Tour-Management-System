'use client';

import { useState } from 'react';
import { MapPin, Clock, Edit3, Trash2, ImageOff } from 'lucide-react';
import { Tour } from '../types/tour.types';
import Image from 'next/image';

interface TourCardProps {
  tour: Tour;
  onEdit: (tour: Tour) => void;
  onDelete: (tour: Tour) => void;
}

export default function TourCard({ tour, onEdit, onDelete }: TourCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex flex-col sm:flex-row bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200/60 dark:border-slate-800/60 overflow-hidden hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300">
      {/* IMAGE SECTION */}
      <div className="relative w-full sm:w-40 h-36 sm:h-auto overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        {imgError ? (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <ImageOff size={20} strokeWidth={1.5} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              No Image
            </span>
          </div>
        ) : (
          <Image
            src={tour.image ? tour.image : ''}
            alt={tour.title}
            fill
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        )}

        {/* COMPACT STATUS BADGE */}
        {!tour.isActive && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur-md text-[9px] font-black text-white rounded-md uppercase tracking-widest border border-white/10">
            Hidden
          </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-bold text-[15px] text-slate-900 dark:text-white leading-tight line-clamp-1">
              {tour.title}
            </h3>

            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => onEdit(tour)}
                className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-400 hover:text-blue-600 rounded-lg transition-all cursor-pointer active:scale-90"
              >
                <Edit3 size={15} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => onDelete(tour)}
                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-600 rounded-lg transition-all cursor-pointer active:scale-90"
              >
                <Trash2 size={15} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <p className="text-[12px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug">
            {tour.description}
          </p>
        </div>

        {/* DATA BAR */}
        <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              <MapPin size={12} className="text-blue-500" />
              {tour.location}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              <Clock size={12} className="text-blue-500" />
              {tour.duration}d
            </div>
          </div>

          <div className="text-sm font-black text-slate-900 dark:text-white">
            <span className="text-[9px] text-slate-400 font-bold mr-1">$</span>
            {tour.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
