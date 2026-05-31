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

export function PackageCard({ pkg }: { pkg: Package }) {
  console.log('Rendering PackageCard for:', pkg.description);
  const [showDrawer, setShowDrawer] = useState(false);
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
    <>
      <div className="group relative bg-white dark:bg-slate-900 rounded-[3.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700">
        {/* IMAGE AREA */}
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
              onClick={() => setShowDrawer(true)}
              className="p-3 cursor-pointer bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            >
              <Info size={18} />
            </button>

            <div className="px-5 py-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl">
              <p className="text-sm font-black text-blue-600 uppercase tracking-tighter">
                $ {pkg.price.toLocaleString()}
              </p>
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

      {/* RIGHT SIDEBAR DRAWER PANEL LAYOUT */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-500 ${
          showDrawer
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay blur filter */}
        <div
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          onClick={() => setShowDrawer(false)}
        />

        {/* Sliding Sidebar Panel Wrapper Container */}
        <div
          className={`relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-500 transform ${
            showDrawer ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="space-y-6 overflow-y-auto pr-2">
            {/* Drawer Header block index row */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                  Tour Overview
                </span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {pkg.title}
                </h4>
              </div>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Package Image inside Side View */}
            {!imgError && pkg.image && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Dynamic Content Text String Segment */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block">
                Itinerary Description
              </span>
              {/* 💡 whitespace-pre-line preserves database formatting line breaks instantly */}
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium whitespace-pre-line">
                {pkg.description ||
                  'Embark on a journey through the heart of Sri Lanka. Experience local traditions, breathtaking landscapes, and premium hospitality tailored just for you.'}
              </p>
            </div>
          </div>

          {/* Bottom Action Footer block interface */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
            <Link
              href={generateBookingUrl()}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider transition-all"
            >
              Proceed to Reservation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
