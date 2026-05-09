import { Star, MapPin, Quote } from 'lucide-react';
import { Review } from '../types/reviews.type';

export function ReviewCard({ rating, comment, user, tour }: Review) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="group relative p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
      {/* Background Quote Icon for Design Depth */}
      <Quote className="absolute top-6 right-8 h-12 w-12 text-slate-50 dark:text-slate-800/50 -z-0 group-hover:text-blue-50 dark:group-hover:text-blue-900/20 transition-colors" />

      <div className="relative z-10">
        {/* STARS */}
        <div className="flex gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
            />
          ))}
        </div>

        {/* COMMENT */}
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic mb-8 min-h-[80px]">
          "{comment}"
        </p>

        {/* TOUR TAG (UX Improvement) */}
        <div className="mb-6 inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
          <MapPin size={10} />
          {tour.title}
        </div>

        {/* USER INFO */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
            {user.firstName[0]}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {fullName}
            </h4>
            <p className="text-[11px] text-slate-400 font-medium">
              Verified Traveler
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
