'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  CreditCard,
  Hash,
  Calendar,
  Eye,
  X,
  Terminal,
  RotateCcw,
} from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Payment } from '../types/payments.type';
import { formatReservationId, fromatePaymentId } from '@/lib/format/ids';

interface Props {
  data: Payment[];
  onRefund: (id: number) => Promise<any>;
  isRefunding: boolean;
}

export function PaymentsTable({ data, onRefund, isRefunding }: Props) {
  const [selectedGatewayJson, setSelectedGatewayJson] = useState<Record<
    string,
    any
  > | null>(null);

  return (
    <div className="w-full space-y-6">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden xl:block overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl shadow-slate-200/20 dark:shadow-none">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-900/80">
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                User Info
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Transaction Details
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Type & Method
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Status
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {data.map((item) => (
              <PaymentRow
                key={item.id}
                item={item}
                isGlobalRefunding={isRefunding}
                onRefund={onRefund}
                onViewJson={() =>
                  setSelectedGatewayJson(item.gatewayData || {})
                }
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item) => (
          <PaymentCard
            key={item.id}
            item={item}
            isGlobalRefunding={isRefunding}
            onRefund={onRefund}
            onViewJson={() => setSelectedGatewayJson(item.gatewayData || {})}
          />
        ))}
      </div>

      {/* --- GATEWAY DATA JSON INSPECTOR MODAL OVERLAY --- */}
      {selectedGatewayJson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-3xl max-h-[80vh] flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                  <Terminal size={14} />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    Gateway Callback Logs
                  </h3>
                  <p className="text-[10px] font-medium text-slate-400">
                    Raw financial network diagnostic response payload
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedGatewayJson(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-950 font-mono text-xs text-emerald-400/90 leading-relaxed selection:bg-emerald-500/20">
              <pre className="whitespace-pre-wrap break-all">
                {JSON.stringify(selectedGatewayJson, null, 2)}
              </pre>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedGatewayJson(null)}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 cursor-pointer transition-opacity"
              >
                Close Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * DESKTOP ROW COMPONENT
 */
function PaymentRow({
  item,
  onViewJson,
  onRefund,
  isGlobalRefunding,
}: {
  item: Payment;
  onViewJson: () => void;
  onRefund: (id: number) => Promise<any>;
  isGlobalRefunding: boolean;
}) {
  const handleRefundClick = async () => {
    if (
      window.confirm(
        `Are you sure you want to trigger a database refund for Transaction: ${item.transactionId}?`,
      )
    ) {
      try {
        await onRefund(item.id);
      } catch (err) {
        console.error('Refund submission failed', err);
      }
    }
  };

  return (
    <tr className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
      <td className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 font-black text-xs">
            {item.user?.firstName?.[0] || <User size={16} />}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {item.user?.firstName} {item.user?.lastName}
            </span>
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Mail size={10} /> {item.user?.email}
            </span>
          </div>
        </div>
      </td>

      <td className="p-5">
        <div className="flex flex-col">
          <span className="font-black text-base text-slate-900 dark:text-white flex items-center gap-1.5">
            ${item.amount.toLocaleString()}
          </span>
          <span className="text-[10px] font-medium text-slate-400 mt-1 flex items-center gap-1">
            <Hash size={10} /> {item.transactionId}
          </span>
          <span className="text-[10px] font-bold text-slate-500 mt-0.5 flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-black tracking-wider text-slate-400 uppercase">
              Payment
            </span>{' '}
            {fromatePaymentId(item.id)}
          </span>
          <span className="text-[10px] font-bold text-slate-500 mt-0.5 flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-black tracking-wider text-slate-400 uppercase">
              Booking
            </span>{' '}
            {formatReservationId(item.bookingId)}
          </span>
        </div>
      </td>

      <td className="p-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`text-[10px] font-bold px-2 py-0 border-none ${
                item.type === 'FULL'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-indigo-50 text-indigo-600'
              }`}
            >
              {item.type}
            </Badge>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <CreditCard size={12} /> {item.method}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            {format(new Date(item.createdAt), 'MMM dd, yyyy • HH:mm')}
          </span>
        </div>
      </td>

      <td className="p-5">
        <Badge
          className={`rounded-lg font-black text-[10px] uppercase px-3 py-1 ${getStatusStyles(item.status)}`}
        >
          {item.status}
        </Badge>
      </td>

      <td className="p-5 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onViewJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-bold text-xs cursor-pointer transition-all"
          >
            <Eye size={12} />
            Inspect Logs
          </button>

          {item.status === 'SUCCESS' && (
            <button
              disabled={isGlobalRefunding}
              onClick={handleRefundClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-100 disabled:opacity-50 font-bold text-xs cursor-pointer transition-all"
            >
              <RotateCcw size={12} /> Refund
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

/**
 * MOBILE CARD COMPONENT
 */
function PaymentCard({
  item,
  onViewJson,
  onRefund,
  isGlobalRefunding,
}: {
  item: Payment;
  onViewJson: () => void;
  onRefund: (id: number) => Promise<any>;
  isGlobalRefunding: boolean;
}) {
  const handleRefundClick = async () => {
    if (
      window.confirm(
        `Issue complete refund for Booking Reference #${item.bookingId}?`,
      )
    ) {
      try {
        await onRefund(item.id);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 font-black">
            {item.user?.firstName?.[0]}
          </div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white text-base leading-none">
              {item.user?.firstName} {item.user?.lastName}
            </h4>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">
              {item.user?.email}
            </p>
          </div>
        </div>
        <Badge
          className={`rounded-lg font-black text-[9px] uppercase px-2 py-0.5 ${getStatusStyles(item.status)}`}
        >
          {item.status}
        </Badge>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">
            Booking ID
          </span>
          <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
            {formatReservationId(item.bookingId)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">
            Amount
          </span>
          <span className="font-black text-slate-900 dark:text-white">
            ${item.amount.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">
            Type
          </span>
          <span
            className={`text-xs font-bold ${item.type === 'FULL' ? 'text-emerald-600' : 'text-indigo-600'}`}
          >
            {item.type}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Calendar size={12} />
          <span className="text-[10px] font-black uppercase">
            {format(new Date(item.createdAt), 'dd MMM yyyy')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Hash size={12} />
          <span className="text-[10px] font-bold">{item.transactionId}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={onViewJson}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs cursor-pointer transition-colors"
        >
          <Eye size={13} />
          Inspect Logs
        </button>

        {item.status === 'SUCCESS' && (
          <button
            disabled={isGlobalRefunding}
            onClick={handleRefundClick}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40 font-bold text-xs disabled:opacity-50 cursor-pointer transition-colors"
          >
            <RotateCcw size={13} /> Refund
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * UTILITY: SEMANTIC COLORS FOR STATUS
 */
function getStatusStyles(status: string) {
  switch (status) {
    case 'SUCCESS':
      return 'bg-emerald-500 text-white hover:bg-emerald-500';
    case 'PENDING':
      return 'bg-amber-500 text-white hover:bg-amber-500';
    case 'FAILED':
    case 'CANCELLED':
      return 'bg-rose-500 text-white hover:bg-rose-500';
    case 'REFUNDED':
      return 'bg-violet-500 text-white hover:bg-violet-500';
    default:
      return 'bg-slate-500 text-white';
  }
}
