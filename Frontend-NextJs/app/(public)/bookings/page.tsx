'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import { BookingForm } from '@/features/bookings/components/BookingForm';

export default function BookingsPage() {
  const searchParams = useSearchParams();

  // USEMEMO PREVENTS UNNECESSARY DECODING ON EVERY RENDER
  const tourData = useMemo(() => {
    const encodedId = searchParams.get('p');
    try {
      return {
        id: encodedId ? atob(encodedId) : null,
        title: searchParams.get('t'),
        location: searchParams.get('loc'),
        price: searchParams.get('price'),
        duration: searchParams.get('dur'),
        minGuests: searchParams.get('min'),
        maxGuests: searchParams.get('max'),
      };
    } catch (error) {
      return { id: null };
    }
  }, [searchParams]);

  //   STATE TO TRACK TOTAL PRICE BASED ON GUEST COUNT
  const [totalPrice, setTotalPrice] = useState(Number(tourData.price));

  // IF NO VALID TOUR DATA, SHOW ERROR MESSAGE
  if (!tourData.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-500">
        <div className="max-w-md w-full text-center space-y-6 p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <AlertCircle className="text-red-500" size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              Link Expired or Invalid
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              We couldn't find the package details you're looking for. Please go
              back and select your adventure again.
            </p>
          </div>
          <Link
            href="/packages"
            className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-[0.98]"
          >
            <ArrowLeft size={16} /> Browse Packages
          </Link>
        </div>
      </div>
    );
  }

  // MAIN CONTENT FOR VALID TOUR DATA
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* BREADCRUMBS */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8">
          <Link
            href="/packages"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Packages
          </Link>
          <ChevronRight size={12} strokeWidth={3} />
          <span className="text-slate-900 dark:text-slate-200">Booking</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: FORM AREA */}
          <div className="lg:col-span-7 space-y-10">
            <header className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400">
                <Info size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Booking Details
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
                Finalize Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Reservation.
                </span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-md">
                Secure your spot in just a few steps. Your adventure in{' '}
                {tourData.location} awaits.
              </p>
            </header>

            <div className="p-8 lg:p-12 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/60 dark:shadow-none transition-all">
              <BookingForm
                tourId={Number(tourData.id)}
                pricePerGuest={Number(tourData.price)}
                minGuests={Number(tourData.minGuests)}
                maxGuests={Number(tourData.maxGuests)}
                onTotalChange={setTotalPrice}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: SUMMARY CARD (STICKY) */}
          <div className="lg:col-span-5 lg:sticky lg:top-10">
            <div className="bg-slate-900 rounded-[3.5rem] p-10 lg:p-12 text-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]  overflow-hidden relative group">
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    Verified Package
                  </div>
                  <h2 className="text-4xl font-black leading-tight tracking-tighter">
                    {tourData.title}
                  </h2>
                </div>

                <div className="space-y-6 border-y border-white/10 py-10">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5">
                      <MapPin size={22} className="text-blue-300" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">
                        Location
                      </p>
                      <p className="text-lg font-bold">{tourData.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5">
                      <Clock size={22} className="text-blue-300" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">
                        Duration
                      </p>
                      <p className="text-lg font-bold">
                        {tourData.duration} Days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white/5 p-6 rounded-[2rem] border border-white/5">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">
                      Payable Amount
                    </p>
                    <p className="text-4xl font-black tracking-tighter">
                      $ {totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
