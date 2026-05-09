import { SlidersHorizontal, Sparkles, Star } from 'lucide-react';
import { ReviewsState } from '../types/reviews.type';
import { Skeleton } from '@/components/common/Skeleton';
import { StatBadge } from '@/components/common/admin/StatBadge';
import { PageHeader } from '@/components/common/admin/PageHeader';
import { AdminBadge } from '@/components/common/admin/AdminBadge';

interface Props {
  stats: ReviewsState | null;
  isLoading: boolean;
}

export function ReviewsHeader({ stats, isLoading }: Props) {
  // 1. REFINED LOADING STATE
  if (isLoading) {
    return (
      <div className="pb-2 space-y-6 animate-pulse">
        <Skeleton className="h-7 w-32 rounded-full mx-auto md:mx-0" />

        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
          <div className="flex items-center gap-5 w-full">
            <Skeleton className="hidden sm:block h-16 w-16 rounded-[1.75rem] shrink-0" />
            <div className="space-y-3 w-full max-w-xl">
              <Skeleton className="h-10 w-3/4 rounded-xl" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-5/6 rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-[72px] w-48 rounded-2xl shrink-0" />
        </div>
      </div>
    );
  }

  return (
    <header className="pb-2 space-y-6">
      {/* 2. TOP BADGE */}
      <div className="flex justify-center md:justify-start">
        <AdminBadge label="Public Stories" variant="amber" />
      </div>

      {/* 3. MAIN HEADER CONTENT */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
        <div className="flex-1 w-full">
          <PageHeader
            title="Guest"
            highlight="Reviews"
            subtitle=" Manage and curate traveler feedback. Highlight the best experiences to
          boost your tour visibility."
            variant="amber"
            icon={Sparkles}
          />
        </div>

        {/* 4. METRICS / STATS AREA */}
        <div className="shrink-0 group">
          <StatBadge
            label="Database Entries"
            value={stats?.total || 0}
            unit="Total"
            icon={SlidersHorizontal}
            variant="amber"
          />
        </div>
      </div>
    </header>
  );
}
