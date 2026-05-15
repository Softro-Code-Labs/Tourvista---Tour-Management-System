'use client';

import { usePaymentsAdmin } from '../hooks/usePayments';
import { PaymentsHeader } from './Header';
import { PaymentsFilterBar } from './FilterBar';
import { PaymentsTable } from './Table';
import Pagination from '@/components/common/Pagination';
import { EmptyState } from '@/components/common/admin/EmptyState';
import { OverlayLoader } from '@/components/common/admin/OverlayLoader';

export default function PaymentsManager() {
  const {
    stats,
    isStatsLoading,

    payments,
    meta,
    isLoading,
    isError,

    filters,
    setFilter,
    clearFilters,

    refetch,
  } = usePaymentsAdmin();

  // DERIVED UI STATES
  const hasData = payments.length > 0;
  const isDatabaseEmpty = !isLoading && !isError && stats?.total === 0;
  const isFilterEmpty = !isLoading && !isError && !isDatabaseEmpty && !hasData;
  const showTable = !isError && !isDatabaseEmpty && !isFilterEmpty && hasData;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50/50 dark:bg-slate-950/20">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* HEADER SECTION */}
        <PaymentsHeader stats={stats} isLoading={isStatsLoading} />

        {/* FILTER SECTION */}
        <PaymentsFilterBar
          filters={filters}
          onChange={setFilter}
          onClear={clearFilters}
          isLoading={isLoading}
        />

        {/* MAIN CONTENT AREA */}
        <main className="relative min-h-[500px] bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
          {isLoading && <OverlayLoader label="Syncing Payment" />}

          {/* ERROR STATE */}
          {isError && (
            <EmptyState
              type="error"
              title="Connection Error"
              description="We encountered a problem reaching the server. Please check your connection."
              onAction={() => refetch()}
              actionText="Retry Connection"
            />
          )}

          {/* EMPTY DATABASE STATE */}
          {isDatabaseEmpty && (
            <EmptyState
              type="no-data"
              title="No Payments Yet"
              description="Your payment vault is empty. New payments from your customers will appear here automatically."
            />
          )}

          {/* FILTERED RESULTS EMPTY STATE */}
          {isFilterEmpty && (
            <EmptyState
              type="no-results"
              title="No Matches Found"
              description="There are records in your database, but none match your current filters."
              onAction={clearFilters}
            />
          )}

          {/* DATA TABLE & PAGINATION */}
          {showTable && (
            <div className="p-2 animate-in fade-in duration-500">
              <PaymentsTable data={payments} />

              {meta && meta.totalPages > 1 && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50">
                  <Pagination
                    page={meta.page}
                    limit={meta.limit}
                    total={meta.total}
                    totalPages={meta.totalPages}
                    onPageChange={(p) => setFilter('page', p)}
                    onLimitChange={(l) => setFilter('limit', l)}
                  />
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
