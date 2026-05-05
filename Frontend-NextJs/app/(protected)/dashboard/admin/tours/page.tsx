'use client';

import { useState } from 'react';
import {
  Plus,
  Loader2,
  Compass,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useTours } from '@/features/admin/tours/hooks/useTours';
import TourList from '@/features/admin/tours/components/TourList';
import TourFilterBar from '@/features/admin/tours/components/TourFilters';
import TourModal from '@/features/admin/tours/components/TourModal';
import { Tour } from '@/features/admin/tours/types/tour.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DeleteConfirmDialog } from '@/components/dialogs/DeleteConfirmDialog';
import Pagination from '@/components/common/Pagination';

export default function ManageTours() {
  const {
    tours,
    meta,
    isLoading,
    stats,
    filters,
    setFilter,
    clearFilters,
    isDeleting,
    deleteTour,
    refresh,
  } = useTours();
  const [modal, setModal] = useState<{ open: boolean; tour: Tour | null }>({
    open: false,
    tour: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    tour: Tour | null;
  }>({ open: false, tour: null });

  const confirmDeletion = async () => {
    if (!deleteDialog.tour) return;
    if (await deleteTour(deleteDialog.tour.id))
      setDeleteDialog({ open: false, tour: null });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-4 md:p-8 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* SYNCED HEADER FOR TOURS */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
              <Sparkles size={12} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Admin Console
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-xl shadow-blue-500/10 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                <Compass
                  size={32}
                  className="text-blue-600"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                  Tour <span className="text-blue-600">Manager</span>
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-2">
                  Manage inventory & optimize performance
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Status box matching Messages page */}
            <div className="hidden sm:flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Inventory
                </p>
                <p className="text-xs font-bold text-emerald-500 flex items-center justify-end gap-1.5">
                  {stats.active} Active Plans
                </p>
              </div>
              <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-800 mx-1" />
              <Button
                onClick={() => setModal({ open: true, tour: null })}
                className="h-10 px-4 rounded-xl bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition-all active:scale-95"
              >
                <Plus size={16} strokeWidth={3} /> Create New
              </Button>
            </div>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden border-none shadow-2xl shadow-blue-500/10 bg-white dark:bg-slate-900 group">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Compass size={28} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  Total Inventory
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-none shadow-2xl shadow-green-500/10 bg-white dark:bg-slate-900 group">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <CheckCircle2 size={28} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                  Live & Public
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">
                  {stats.active}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-none shadow-2xl shadow-slate-500/10 bg-white dark:bg-slate-900 group">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <AlertCircle size={28} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Hidden/Offline
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">
                  {stats.inactive}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <TourFilterBar
          filters={filters}
          onChange={setFilter}
          onClear={clearFilters}
        />

        <main className="relative min-h-[400px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-[2px] z-50 rounded-[2.5rem]">
              <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
          )}
          <TourList
            tours={tours}
            totalCount={stats.total}
            onEdit={(t) => setModal({ open: true, tour: t })}
            onDelete={(t) => setDeleteDialog({ open: true, tour: t })}
            onCreate={() => setModal({ open: true, tour: null })}
            onResetFilters={clearFilters}
          />

          <Pagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
            totalPages={meta.totalPages}
            onPageChange={(p) => setFilter('page', p)}
            onLimitChange={(l) => {
              setFilter('limit', l);
              setFilter('page', 1);
            }}
          />
        </main>

        <TourModal
          isOpen={modal.open}
          onClose={() => setModal({ open: false, tour: null })}
          onSuccess={refresh}
          tour={modal.tour}
        />
        <DeleteConfirmDialog
          isOpen={deleteDialog.open}
          isLoading={isDeleting}
          title={deleteDialog.tour?.title || 'Tour Package'}
          onClose={() => setDeleteDialog({ open: false, tour: null })}
          onConfirm={confirmDeletion}
        />
      </div>
    </div>
  );
}
