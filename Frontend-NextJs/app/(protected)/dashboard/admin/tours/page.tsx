'use client';

import { useState } from 'react';
import {
  Plus,
  Loader2,
  Compass,
  CheckCircle2,
  AlertCircle,
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
  }>({
    open: false,
    tour: null,
  });

  const handleEdit = (tour: Tour) => setModal({ open: true, tour });
  const handleCreate = () => setModal({ open: true, tour: null });

  const promptDelete = (tour: Tour) => setDeleteDialog({ open: true, tour });

  const confirmDeletion = async () => {
    if (!deleteDialog.tour) return;
    const success = await deleteTour(deleteDialog.tour.id);
    if (success) {
      setDeleteDialog({ open: false, tour: null });
    }
  };

  const handleLimitChange = (limit: number) => {
    setFilter('limit', limit);
    setFilter('page', 1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* 1. HEADER */}
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        {/* LEFT SIDE: TITLE & CONTEXT */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Admin Console
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Tour <span className="text-blue-600">Management</span>
          </h1>

          <p className="text-base font-medium text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Manage your travel inventory, optimize pricing, and track package
            performance across all global destinations.
          </p>
        </div>

        {/* RIGHT SIDE: ACTIONS */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCreate}
            className="group relative h-14 px-8 overflow-hidden rounded-2xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95 cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />

            <div className="relative flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                <Plus className="h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
              </div>
              <span className="font-bold tracking-tight text-lg">
                Create New Plan
              </span>
            </div>
          </Button>
        </div>
      </div>

      {/* 2. STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* TOTAL TOURS */}
        <Card className="relative overflow-hidden border-none shadow-2xl shadow-blue-500/10 bg-white dark:bg-slate-900 cursor-pointer group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />

          <CardContent className="p-6 flex items-center gap-5">
            <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg shadow-blue-500/30 text-white transform group-hover:scale-110 transition-transform duration-300">
              <Compass size={28} strokeWidth={2.5} />
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-blue-600/70 dark:text-blue-400 uppercase tracking-[0.2em]">
                Total Inventory
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {stats.total}
                </p>
                <span className="text-[10px] font-bold text-slate-400">
                  Tours
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ACTIVE TOURS */}
        <Card className="relative overflow-hidden border-none shadow-2xl shadow-green-500/10 bg-white dark:bg-slate-900 cursor-pointer group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-colors" />

          <CardContent className="p-6 flex items-center gap-5">
            <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/30 text-white transform group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 size={28} strokeWidth={2.5} />
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-green-600/70 dark:text-green-400 uppercase tracking-[0.2em]">
                Live & Public
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {stats.active}
                </p>
                <div className="flex items-center text-[10px] font-bold text-green-500 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded-md">
                  ↑ Active
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* INACTIVE TOURS */}
        <Card className="relative overflow-hidden border-none shadow-2xl shadow-slate-500/10 bg-white dark:bg-slate-900 cursor-pointer group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-500/10 rounded-full blur-2xl group-hover:bg-slate-500/20 transition-colors" />

          <CardContent className="p-6 flex items-center gap-5">
            <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl shadow-lg shadow-slate-400/30 text-white transform group-hover:scale-110 transition-transform duration-300">
              <AlertCircle size={28} strokeWidth={2.5} />
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                Hidden / Offline
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {stats.inactive}
                </p>
                <span className="text-[10px] font-bold text-slate-400">
                  Disabled
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. SERVER FILTERS */}
      <TourFilterBar
        filters={filters}
        onChange={setFilter}
        onClear={clearFilters}
      />

      {/* 4. CONTENT AREA */}
      <main className="relative min-h-[500px] w-full">
        {/* LOADING SPINNER */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-[2px] rounded-[2.5rem] z-50 transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-blue-900/30 animate-pulse" />
              <div className="p-5 bg-white dark:bg-slate-900 rounded-full shadow-2xl">
                <Loader2
                  className="animate-spin text-blue-600"
                  size={48}
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="mt-6 text-center space-y-1">
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                Updating Inventory
              </p>
              <p className="text-sm text-slate-500 font-medium tracking-tight">
                Syncing with server...
              </p>
            </div>
          </div>
        )}

        {/* TOUR LIST */}
        <TourList
          tours={tours}
          totalCount={stats.total}
          onEdit={handleEdit}
          onDelete={promptDelete}
          onCreate={handleCreate}
          onResetFilters={clearFilters}
        />

        {/* PAGINATION */}
        <footer className="pt-2 border-t border-slate-200 dark:border-white/5">
          <Pagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
            totalPages={meta.totalPages}
            onPageChange={(p) => setFilter('page', p)}
            onLimitChange={handleLimitChange}
          />
        </footer>
      </main>

      {/* TOUR MODAL */}
      <TourModal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, tour: null })}
        onSuccess={refresh}
        tour={modal.tour}
      />

      {/* DELETE CONFIRMATION */}
      <DeleteConfirmDialog
        isOpen={deleteDialog.open}
        isLoading={isDeleting}
        title={deleteDialog.tour?.title || 'Tour Package'}
        onClose={() => setDeleteDialog({ open: false, tour: null })}
        onConfirm={confirmDeletion}
      />
    </div>
  );
}
