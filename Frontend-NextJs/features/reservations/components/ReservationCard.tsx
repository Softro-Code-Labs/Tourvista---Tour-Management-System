'use client';

import { Reservation } from '../types/reservations.type';
import { BookingStatus } from '@/common/enums/booking-status.enum';
import { PaymentType } from '@/common/enums/payment-type.enum';
import { ActionButton } from '@/components/common/ActionButton';
import {
  Calendar,
  Users,
  Edit3,
  Trash2,
  CreditCard,
  Ticket,
  Notebook,
} from 'lucide-react';
import { formatReservationId, fromatePaymentId } from '@/lib/format/ids';
import { cn } from '@/lib/utils';

interface Props {
  reservation: Reservation;
  onPayAdvance: (id: number, amount: number) => void;
  onCompletePayment: (id: number) => void;
  onUpdate: (reservation: Reservation) => void;
  onDelete: () => void;
  onReview: (reservation: Reservation) => void;
  isSubmitting?: boolean;
}

export function ReservationCard({
  reservation,
  onPayAdvance,
  onCompletePayment,
  onUpdate,
  onDelete,
  onReview,
  isSubmitting,
}: Props) {
  const hasPayment = !!reservation.payment;
  const isPending = reservation.status === BookingStatus.PENDING;
  const isCompleted = reservation.status === BookingStatus.COMPLETED;
  const isAdvancePaid = reservation.payment?.type === PaymentType.ADVANCE;
  const isFullPaid = reservation.payment?.type === PaymentType.FULL;

  const statusColors = {
    [BookingStatus.PENDING]: cn(
      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all duration-500',
      'bg-amber-100 text-amber-700',
      'dark:bg-amber-500/10 dark:text-amber-400 dark:border dark:border-amber-500/20 dark:shadow-[0_0_15px_-5px_rgba(245,158,11,0.3)]',
    ),

    [BookingStatus.ACTIVE]: cn(
      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all duration-500',
      'bg-blue-100 text-blue-700',
      'dark:bg-blue-500/10 dark:text-blue-400 dark:border dark:border-blue-500/20 dark:shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]',
    ),

    [BookingStatus.CONFIRMED]: cn(
      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all duration-500',
      'bg-indigo-100 text-indigo-700',
      'dark:bg-indigo-500/10 dark:text-indigo-400 dark:border dark:border-indigo-500/20 dark:shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]',
    ),

    [BookingStatus.COMPLETED]: cn(
      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all duration-500',
      'bg-emerald-100 text-emerald-700',
      'dark:bg-emerald-500/10 dark:text-emerald-400 dark:border dark:border-emerald-500/20 dark:shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]',
    ),

    [BookingStatus.CANCELLED]: cn(
      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all duration-500',
      'bg-rose-100 text-rose-700',
      'dark:bg-rose-500/10 dark:text-rose-400 dark:border dark:border-rose-500/20 dark:shadow-[0_0_15px_-5px_rgba(225,29,72,0.3)]',
    ),
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
      {/* HEADER: ID & STATUS */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <Ticket size={12} className="text-slate-400" />
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            {formatReservationId(reservation.id)}
          </span>
        </div>
        <span className={statusColors[reservation.status]}>
          {reservation.status}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="mb-6 text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
        {reservation.tour.title}
      </h3>

      {/* DATA GRID */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="col-span-2 flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/50">
          <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-blue-500">
            <Calendar size={18} />
          </div>
          <div className="flex-1 flex justify-between items-center pr-2">
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-tighter">
                Dates of travel
              </p>
              <p className="text-xs font-bold dark:text-slate-200">
                {new Date(reservation.arrivalDate).toLocaleDateString()} —{' '}
                {new Date(reservation.checkoutDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/50">
          <Users size={16} className="text-blue-500" />
          <div>
            <p className="text-[9px] text-slate-400 uppercase font-black">
              Travellers
            </p>
            <p className="text-xs font-bold dark:text-slate-200">
              {reservation.numberOfTravellers} People
            </p>
          </div>
        </div>
      </div>

      {/* FINANCIAL SECTION */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.1em]">
              Grand Total
            </p>
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              ${reservation.totalAmount.toLocaleString()}
            </p>
          </div>

          {isFullPaid ? (
            <div className="flex flex-col items-end">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-lg border border-emerald-500/20">
                Fully Secured
              </span>
            </div>
          ) : (
            isAdvancePaid && (
              <div className="text-right">
                <p className="text-[9px] text-emerald-500 uppercase font-black tracking-widest">
                  Initial Payment
                </p>
                <p className="text-lg font-bold text-emerald-600">
                  ${reservation.payment?.amount.toLocaleString()}
                </p>
              </div>
            )
          )}
        </div>

        {/* RECEIPT FOOTER (If payment exists) */}
        {hasPayment && (
          <div className="flex items-center gap-2 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800">
            <CreditCard size={12} className="text-slate-400" />
            <p className="text-[10px] font-medium text-slate-400">
              Receipt:{' '}
              <span className="font-mono text-slate-600 dark:text-slate-300">
                {fromatePaymentId(reservation.payment?.id ?? 0)}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="pt-2">
        {!hasPayment && isPending ? (
          <section className="flex flex-col gap-3">
            <div className="flex gap-2">
              <ActionButton
                text="Pay Full"
                variant="default"
                className="flex-1 !h-12"
                onClick={() => onCompletePayment(reservation.id)}
              />
              <ActionButton
                text="Advance"
                variant="secondary"
                className="flex-1 !h-12"
                onClick={() =>
                  onPayAdvance(reservation.id, reservation.totalAmount)
                }
              />
            </div>
            <div className="flex gap-2">
              <ActionButton
                text="Edit"
                variant="outline"
                icon={<Edit3 size={14} />}
                className="flex-1 !h-10 text-[9px]"
                onClick={() => onUpdate(reservation)}
              />
              <ActionButton
                text="Cancel"
                variant="danger"
                icon={<Trash2 size={14} />}
                className="flex-1 !h-10 text-[9px]"
                onClick={onDelete}
              />
            </div>
          </section>
        ) : isAdvancePaid ? (
          <div className="bg-blue-500/5 dark:bg-blue-500/10 p-4 rounded-3xl border border-blue-500/20">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[10px] font-black text-blue-500 uppercase">
                Balance Outstanding
              </p>
              <p className="text-sm font-black text-blue-600 dark:text-blue-400">
                $
                {(
                  reservation.totalAmount - (reservation.payment?.amount ?? 0)
                ).toLocaleString()}
              </p>
            </div>
            <ActionButton
              text="Settle Balance"
              variant="success"
              className="w-full !h-11"
              disabled={isSubmitting}
              onClick={() => onCompletePayment(reservation.id)}
            />
          </div>
        ) : isCompleted ? (
          <div className="flex flex-col gap-3">
            <div className="bg-emerald-500/5 dark:bg-emerald-500/10 p-4 rounded-3xl border border-emerald-500/20">
              <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase mb-3 text-center tracking-widest">
                Trip Successfully Finished
              </p>
              <ActionButton
                text="Rate Experience"
                variant="success"
                icon={<Edit3 size={14} />}
                className="w-full !h-12 shadow-lg shadow-emerald-500/20"
                onClick={() => onReview(reservation)}
              />
            </div>
          </div>
        ) : (
          <p className="w-full cursor-pointer group/btn flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all py-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl hover:border-blue-500/50">
            <Notebook
              size={14}
              className="group-hover/btn:translate-x-1 transition-transform"
            />{' '}
            Notes: {reservation?.notes || 'No notes'}
          </p>
        )}
      </div>
    </div>
  );
}
