'use client';

import { SlidersHorizontal, Map, MapPin, Palmtree } from 'lucide-react';
import { Skeleton } from '@/components/common/Skeleton';
import { AdminBadge } from '@/components/common/admin/AdminBadge';
import { PageHeader } from '@/components/common/admin/PageHeader';
import { StatBadge } from '@/components/common/admin/StatBadge';
import { CultureStats } from '../types/culture.type';

interface Props {
  stats: CultureStats | null;
  isLoading: boolean;
  onClick: () => void;
}

export default function CultureHeader({ stats, isLoading, onClick }: Props) {
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
        <AdminBadge label="Culture" variant="blue" />
      </div>

      {/* 3. MAIN HEADER CONTENT */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
        <div className="flex-1 w-full">
          <PageHeader
            title="Culture"
            highlight="View"
            subtitle="Manage culture categories and control how they appear to users on the website."
            icon={Palmtree}
          />
        </div>

        {/* 4. METRICS / STATS AREA */}
        <div className="shrink-0 group">
          <StatBadge
            label="Inventory"
            value={stats?.total || 0}
            unit="Culture"
            icon={SlidersHorizontal}
            variant="green"
            onClick={onClick}
          />
        </div>
      </div>
    </header>
  );
}
