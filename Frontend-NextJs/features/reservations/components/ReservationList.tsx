'use client';

import { useState } from 'react';
import { Reservation } from '../types/reservations.type';
import { ReservationCard } from './ReservationCard';
import { UpdateBookingForm } from './UpdateBookingForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePayments } from '@/features/payments/hooks/usePayments';
import { useBooking } from '@/features/bookings/hooks/useBookings';
import { PaymentModal } from '@/features/payments/components/PaymentModal';
import { useReservations } from '../hooks/useReservations';
import { DeleteConfirmDialog } from '@/components/dialogs/DeleteConfirmDialog';
import Pagination from '@/components/common/Pagination';

import { PaymentType } from '@/common/enums/payment-type.enum';
import { formatReservationId } from '@/lib/format/ids';
import { Inbox, ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function ReservationList() {
  const { reservations, meta, filters, setFilter, onLoading, onRefresh } =
    useReservations();

  const { isSubmitting: isPaying } = usePayments();
  const { deleteBooking, isSubmitting: isDeleting } = useBooking();

  const [activePayment, setActivePayment] = useState<{
    id: number;
    totalAmount: number;
    initialAmount: number;
    type: PaymentType;
  } | null>(null);

  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    reservationId: number | null;
  }>({ open: false, reservationId: null });

  const handleDelete = async () => {
    if (!deleteDialog.reservationId) return;
    if (await deleteBooking(deleteDialog.reservationId)) {
      setDeleteDialog({ open: false, reservationId: null });
      onRefresh();
    }
  };

  if (onLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-slate-100 animate-pulse rounded-3xl"
          />
        ))}
      </div>
    );

  if (reservations.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95 duration-500">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
            <Inbox size={48} className="text-slate-300 dark:text-slate-700" />
          </div>
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          No Reservations Found
        </h2>
        <p className="max-w-md text-slate-500 dark:text-slate-400 font-medium mb-10">
          It looks like you haven't booked any tours yet. Explore our curated
          collection of luxury packages to start your journey.
        </p>
        <Link
          href="/packages"
          className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-slate-500/20"
        >
          Browse Packages
        </Link>
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((res) => (
          <ReservationCard
            key={res.id}
            reservation={res}
            isSubmitting={isPaying || isDeleting}
            onPayAdvance={(id, total) =>
              setActivePayment({
                id,
                totalAmount: total,
                initialAmount: total * 0.25,
                type: PaymentType.ADVANCE,
              })
            }
            onCompletePayment={(id) => {
              const resData = reservations.find((r) => r.id === id);
              const remaining = resData
                ? resData.totalAmount - (resData.payment?.amount ?? 0)
                : 0;
              setActivePayment({
                id,
                totalAmount: resData?.totalAmount ?? 0,
                initialAmount: remaining,
                type: PaymentType.FULL,
              });
            }}
            onUpdate={(res) => setEditingReservation(res)}
            onDelete={() =>
              setDeleteDialog({ open: true, reservationId: res.id })
            }
          />
        ))}
      </div>

      <footer className="mt-32 pt-12 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Display Density
            </span>
            <div className="flex p-1 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl gap-1 shadow-sm">
              {[12, 24, 48].map((val) => (
                <button
                  key={val}
                  onClick={() => setFilter('limit', val)}
                  className={cn(
                    'px-4 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all',
                    filters.limit === val
                      ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-md'
                      : 'text-slate-400 hover:text-slate-600',
                  )}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200/40 dark:border-slate-800/40">
            <ListFilter size={18} className="text-blue-500" />
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
              Sorted by{' '}
              <span className="text-slate-900 dark:text-white">
                Newest First
              </span>
            </p>
          </div>
        </div>

        <Pagination
          page={filters.page}
          limit={filters.limit}
          limits={[12, 24, 48]}
          total={meta.total}
          totalPages={meta.totalPages}
          onPageChange={(p) => setFilter('page', p)}
          onLimitChange={(l) => {
            setFilter('limit', l);
            setFilter('page', 1);
          }}
        />
      </footer>

      {/* MODAL 1: PAYMENT */}
      {activePayment && (
        <PaymentModal
          bookingId={activePayment.id}
          paymentId={
            reservations.find((r) => r.id === activePayment.id)?.payment?.id
          }
          totalAmount={activePayment.totalAmount}
          initialAmount={activePayment.initialAmount}
          type={activePayment.type}
          isExistingPayment={
            reservations.find((r) => r.id === activePayment.id)?.payment !==
            null
          }
          onCancel={() => setActivePayment(null)}
          onSuccess={() => {
            setActivePayment(null);
            onRefresh?.();
          }}
        />
      )}

      {/* MODAL 2: UPDATE RESERVATION */}
      <Dialog
        open={!!editingReservation}
        onOpenChange={() => setEditingReservation(null)}
      >
        <DialogContent className="sm:max-w-[500px] rounded-[2rem] p-8 overflow-hidden border-none">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black">
              Update Reservation Details
            </DialogTitle>
          </DialogHeader>
          {editingReservation && (
            <UpdateBookingForm
              reservation={editingReservation}
              onSuccess={() => {
                setEditingReservation(null);
                onRefresh?.();
              }}
              onCancel={() => setEditingReservation(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL 3: DELETE CONFIRM */}
      <DeleteConfirmDialog
        isOpen={deleteDialog.open}
        isLoading={isDeleting}
        title={formatReservationId(deleteDialog.reservationId!)}
        onClose={() => setDeleteDialog({ open: false, reservationId: null })}
        onConfirm={handleDelete}
      />
    </>
  );
}
