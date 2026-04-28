'use client';

import { useState } from 'react';
import { Package } from '../types/package.types';
import {
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Info,
  X,
  ImageOff,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function PackageCard({ pkg }: { pkg: Package }) {
  const [showDetails, setShowDetails] = useState(false);
  const [imgError, setImgError] = useState(false);

  // HELPER TO GENERATE BOOKING URL WITH ENCRYPTED PACKAGE ID
  const generateBookingUrl = () => {
    const encodedId = btoa(pkg.id.toString());

    const params = new URLSearchParams({
      p: encodedId,
      t: pkg.title,
      loc: pkg.location,
      price: pkg.price.toString(),
      dur: pkg?.duration.toString(),
      min: pkg?.minGuests.toString(),
      max: pkg?.maxGuests.toString(),
    });
    return `/bookings?${params.toString()}`;
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-[3.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700">
      {/* IMAGE AREA WITH DESCRIPTION OVERLAY */}
      <div className="aspect-[16/12] overflow-hidden relative">
        {imgError ? (
          <div className="flex flex-col justify-center items-center gap-2 text-slate-400 h-full">
            <ImageOff size={108} strokeWidth={1.5} />
            <span className="text-4xl font-bold uppercase tracking-tighter">
              No Image
            </span>
          </div>
        ) : (
          <Image
            src={pkg.image ? pkg.image : ''}
            alt={pkg.title}
            onError={() => setImgError(true)}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        )}

        {/* TOP BADGES */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-3 cursor-pointer bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-90"
          >
            {showDetails ? <X size={18} /> : <Info size={18} />}
          </button>

          <div className="px-5 py-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl">
            <p className="text-sm font-black text-blue-600 uppercase tracking-tighter">
              $ {pkg.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* DESCRIPTION OVERLAY (THE "PEEK" FEATURE) */}
        <div
          className={cn(
            'absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-md p-10 flex flex-col justify-center transition-all duration-500',
            showDetails
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10 pointer-events-none',
          )}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">
            Itinerary Highlights
          </span>
          <p className="text-slate-200 text-sm leading-relaxed font-medium line-clamp-6">
            {pkg.description ||
              'Embark on a journey through the heart of Sri Lanka. Experience local traditions, breathtaking landscapes, and premium hospitality tailored just for you.'}
          </p>
          <div className="mt-6 flex gap-4">
            <div className="text-white text-[10px] font-bold uppercase border border-white/20 px-3 py-1 rounded-lg">
              All Inclusive
            </div>
            <div className="text-white text-[10px] font-bold uppercase border border-white/20 px-3 py-1 rounded-lg">
              Guided
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-10 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-50 dark:bg-blue-500/10 w-fit px-3 py-1.5 rounded-xl">
            <MapPin size={12} />
            {pkg.location}
          </div>

          <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-[1] tracking-tight">
            {pkg.title}
          </h3>

          <div className="flex items-center gap-6 text-slate-400">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Clock size={16} className="text-slate-300" />
              <span>{pkg.duration} Days</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span className="dark:text-slate-400">Verified Tour</span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
          <Link
            href={generateBookingUrl()}
            className="group/btn relative w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-black rounded-[2rem] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all active:scale-[0.97]"
          >
            <span className="relative z-10">Book Now</span>
            <ArrowRight
              size={18}
              className="relative z-10 group-hover/btn:translate-x-2 transition-transform"
            />
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}
