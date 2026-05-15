'use client';

import { User, Mail, CreditCard, Hash, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Payment } from '../types/payments.type';

interface Props {
  data: Payment[];
}

export function PaymentsTable({ data }: Props) {
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
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {data.map((item) => (
              <PaymentRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item) => (
          <PaymentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

/**
 * DESKTOP ROW COMPONENT
 */
function PaymentRow({ item }: { item: Payment }) {
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

      <td className="p-5 text-right">
        <Badge
          className={`rounded-lg font-black text-[10px] uppercase px-3 py-1 ${getStatusStyles(item.status)}`}
        >
          {item.status}
        </Badge>
      </td>
    </tr>
  );
}

/**
 * MOBILE CARD COMPONENT
 */
function PaymentCard({ item }: { item: Payment }) {
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
