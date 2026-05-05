'use client';

import { usePackages } from '../hooks/usePackages';
import { PackageCard } from './PackageCard';
import { PackageSearchFilters } from './PackageFilters';
import { Loader2, Compass, SearchX } from 'lucide-react';
import Pagination from '@/components/common/Pagination';

export default function PackagesList() {
  const { packages, meta, loading, filters, setFilters, clearFilters } =
    usePackages();

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value, page: 1 }));
  };

  return (
    <div className="space-y-10">
      <PackageSearchFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={clearFilters}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Curating your results...
          </p>
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-32 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
          <div className="inline-flex p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-6 text-slate-300">
            {filters.search ? (
              <SearchX size={48} strokeWidth={1} />
            ) : (
              <Compass size={48} strokeWidth={1} />
            )}
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {filters.search ? 'No matching adventures' : 'New Tours Loading'}
          </h3>
          <p className="text-slate-500 mt-2 font-medium max-w-xs mx-auto">
            {filters.search
              ? `We couldn't find anything for "${filters.search}". Try a different location.`
              : 'We are currently curating new premium experiences. Stay tuned.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <Pagination
            page={filters.page}
            limit={filters.limit}
            limits={[12, 24, 48]}
            total={meta.total}
            totalPages={meta.totalPages}
            onPageChange={(p) => handleFilterChange('page', p)}
            onLimitChange={(l) => handleFilterChange('limit', l)}
          />
        </>
      )}
    </div>
  );
}
