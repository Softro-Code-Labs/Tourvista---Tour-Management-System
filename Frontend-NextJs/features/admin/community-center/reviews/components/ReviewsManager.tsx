'use client';

import { useReviewsAdmin } from '../hooks/useReviews';
import { ReviewsHeader } from './Header';
import { ReviewsFilterBar } from './FilterBar';
import { ReviewsTable } from './Table';
import Pagination from '@/components/common/Pagination';
import { EmptyState } from '@/components/common/admin/EmptyState';
import { OverlayLoader } from '@/components/common/admin/OverlayLoader';

export default function ReviewsManager() {
  const {
    stats,
    isStatsLoading,

    reviews,
    meta,
    isLoading,
    isError,

    filters,
    setFilter,
    clearFilters,

    updateVisibility,
    isUpdatingVisibility,
    updateFeatured,
    isUpdatingFeatured,
    deleteReview,
    isDeleting,

    refetch,
  } = useReviewsAdmin();

  // DERIVED UI STATES
  const hasData = reviews.length > 0;
  const isDatabaseEmpty = !isLoading && !isError && stats?.total === 0;
  const isFilterEmpty = !isLoading && !isError && !isDatabaseEmpty && !hasData;
  const showTable = !isError && !isDatabaseEmpty && !isFilterEmpty && hasData;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50/50 dark:bg-slate-950/20">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* HEADER SECTION */}
        <ReviewsHeader stats={stats} isLoading={isStatsLoading} />

        {/* FILTER SECTION */}
        <ReviewsFilterBar
          filters={filters}
          onChange={setFilter}
          onClear={clearFilters}
          isLoading={isLoading}
        />

        {/* MAIN CONTENT AREA */}
        <main className="relative min-h-[500px] bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
          {(isLoading ||
            isUpdatingVisibility ||
            isUpdatingFeatured ||
            isDeleting) && (
            <OverlayLoader
              label={
                isUpdatingVisibility
                  ? 'Updating Visibility...'
                  : isUpdatingFeatured
                    ? 'Updating Featured...'
                    : isDeleting
                      ? 'Deleting...'
                      : 'Syncing Reviews...'
              }
              isMinimal={hasData}
            />
          )}

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
              title="No Reviews Yet"
              description="Your reviews vault is empty. New reviews from your customers will appear here automatically."
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
              <ReviewsTable
                data={reviews}
                onVisibilityChange={(id, isVisible) =>
                  updateVisibility({ id, isVisible })
                }
                onFeaturedChange={(id, isFeatured) =>
                  updateFeatured({ id, isFeatured })
                }
                isUpdating={isUpdatingVisibility || isUpdatingFeatured}
                onDelete={(id) => deleteReview(id)}
                isDeleting={isDeleting}
              />

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
