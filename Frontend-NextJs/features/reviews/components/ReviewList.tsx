'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import SectionTitle from '@/components/sections/SectionTitle';
import { useReviews } from '../hooks/useReviews';
import { ReviewCard } from './ReviewCard';
import { Review } from '../types/reviews.type';

export default function ReviewList() {
  const { data, isLoading, isError } = useReviews();
  const reviews = data?.data || [];

  // Initialize Embla with Autoplay
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 },
      },
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Guest Experiences"
          badge="Testimonials"
          description="Real stories from our international community. Discover why travelers choose Tourvista Tours for their Sri Lankan adventures."
        />

        <div className="mt-16 relative">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[320px] rounded-[2rem] bg-slate-200/50 dark:bg-white/10 animate-pulse"
                />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[2rem]">
              <p className="text-slate-500">Could not load reviews.</p>
            </div>
          ) : (
            // SLIDER VIEWPORT
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-8">
                {reviews.map((review: Review, index: number) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 pl-8 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
                  >
                    <ReviewCard {...review} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-slate-50/50 to-transparent pointer-events-none dark:from-slate-950" />
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-slate-50/50 to-transparent pointer-events-none dark:from-slate-950" />
        </div>
      </div>
    </section>
  );
}
