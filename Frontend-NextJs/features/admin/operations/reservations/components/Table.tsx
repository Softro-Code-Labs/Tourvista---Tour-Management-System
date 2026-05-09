'use client';

import {
  Calendar,
  Users,
  ChevronDown,
  XCircle,
  Trash2,
  Mail,
  MapPin,
  CheckCheck,
  ShieldCheck,
  CircleDot,
  Timer,
} from 'lucide-react';
import { BookingStatus } from '@/common/enums/booking-status.enum';
import { Reservation } from '../types/reservation.types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatReservationId } from '@/lib/format/ids';

interface Props {
  data: Reservation[];
  onStatusChange: (id: number, status: BookingStatus) => void;
  onDelete: (id: number) => void;
  isUpdating: boolean;
}

export default function ReservationTable({
  data,
  onStatusChange,
  onDelete,
  isUpdating,
}: Props) {
  const STATUS_OPTIONS = [
    {
      id: 'PENDING',
      label: 'Pending',
      icon: Timer,
      color:
        'text-amber-600 border-amber-200/50 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/20',
    },
    {
      id: 'ACTIVE',
      label: 'Active',
      icon: CircleDot,
      color:
        'text-blue-600 border-blue-200/50 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-500/20',
    },
    {
      id: 'COMPLETED',
      label: 'Completed',
      icon: CheckCheck,
      color:
        'text-emerald-600 border-emerald-200/50 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/20',
    },
    {
      id: 'CONFIRMED',
      label: 'Confirmed',
      icon: ShieldCheck,
      color:
        'text-indigo-600 border-indigo-200/50 bg-indigo-50 dark:bg-indigo-500/10 dark:border-indigo-500/20',
    },
    {
      id: 'CANCELLED',
      label: 'Cancelled',
      icon: XCircle,
      color:
        'text-rose-600 border-rose-200/50 bg-rose-50 dark:bg-rose-500/10 dark:border-rose-500/20',
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden xl:block overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-900/80">
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                ID & Customer
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Tour & Guests
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Stay Period
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
                Total
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Status
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {data.map((res) => (
              <ReservationRow
                key={res.id}
                res={res}
                options={STATUS_OPTIONS}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                isUpdating={isUpdating}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((res) => (
          <ReservationCard
            key={res.id}
            res={res}
            options={STATUS_OPTIONS}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            isUpdating={isUpdating}
          />
        ))}
      </div>
    </div>
  );
}

function ReservationRow({
  res,
  options,
  onStatusChange,
  onDelete,
  isUpdating,
}: any) {
  return (
    <tr className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
      <td className="p-5">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">
            {formatReservationId(res.id)}
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate w-32">
              {res.user?.firstName} {res.user?.lastName}
            </span>
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Mail size={10} /> {res.user?.email}
            </span>
          </div>
        </div>
      </td>

      <td className="p-5">
        <div className="flex flex-col">
          <span className="font-bold text-[13px] text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <MapPin size={12} className="text-indigo-500" /> {res.tour?.title}
          </span>
          <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1 mt-1">
            <Users size={12} /> {res.numberOfTravellers} Travellers
          </span>
        </div>
      </td>

      <td className="p-5">
        <div className="flex items-center gap-2 text-[12px] font-bold text-slate-600 dark:text-slate-400">
          <Calendar size={13} className="text-blue-500" />
          {format(new Date(res.arrivalDate), 'MMM dd')} —{' '}
          {format(new Date(res.checkoutDate), 'MMM dd, yyyy')}
        </div>
      </td>

      <td className="p-5 text-right font-black text-slate-900 dark:text-white text-base">
        ${res.totalAmount.toLocaleString()}
      </td>

      <td className="p-5">
        <StatusDropdown
          res={res}
          options={options}
          onStatusChange={onStatusChange}
          isUpdating={isUpdating}
        />
      </td>

      <td className="p-5 text-center">
        <button
          onClick={() => onDelete(res.id)}
          className="p-2.5 rounded-2xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}

function ReservationCard({
  res,
  options,
  onStatusChange,
  onDelete,
  isUpdating,
}: any) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-start">
          <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">
            {formatReservationId(res.id)}
          </span>
          <div className="space-y-1">
            <h4 className="font-black text-slate-900 dark:text-white text-lg leading-none">
              {res.user?.firstName} {res.user?.lastName}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail size={12} /> {res.user?.email}
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(res.id)}
          className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 active:scale-95"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
            <MapPin size={20} />
          </div>
          <p className="font-bold text-slate-900 dark:text-slate-100">
            {res.tour?.title}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-blue-500" />
            <p className="font-bold text-[11px] text-slate-900 dark:text-slate-100">
              {format(new Date(res.arrivalDate), 'dd MMM')} -{' '}
              {format(new Date(res.checkoutDate), 'dd MMM')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Users size={18} className="text-emerald-500" />
            <p className="font-bold text-[11px] text-slate-900 dark:text-slate-100">
              {res.numberOfTravellers} People
            </p>
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <p className="font-black text-xl text-slate-900 dark:text-white">
          ${res.totalAmount.toLocaleString()}
        </p>
        <StatusDropdown
          res={res}
          options={options}
          onStatusChange={onStatusChange}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
}

function StatusDropdown({ res, options, onStatusChange, isUpdating }: any) {
  const currentStatus =
    options.find((s: any) => s.id === res.status) || options[0];
  const StatusIcon = currentStatus.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isUpdating} className="outline-none group">
        <Badge
          variant="outline"
          className={cn(
            'flex items-center gap-2 capitalize font-black text-[10px] tracking-widest px-4 py-2 border-2 transition-all active:scale-95',
            currentStatus.color,
            res.status === 'PENDING' &&
              'animate-pulse ring-4 ring-amber-500/10',
          )}
        >
          <StatusIcon
            size={12}
            strokeWidth={res.status === 'PENDING' ? 3 : 2}
          />
          {currentStatus.label}
          <ChevronDown
            size={10}
            className="ml-1 opacity-40 group-hover:opacity-100 transition-opacity"
          />
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-2 rounded-3xl shadow-2xl border-slate-200 dark:border-slate-800"
      >
        {options
          .filter((o: any) => o.id !== res.status)
          .map((option: any) => (
            <DropdownMenuItem
              key={option.id}
              onClick={() => onStatusChange(res.id, option.id)}
              className={cn(
                'rounded-2xl flex items-center gap-3 font-bold text-xs cursor-pointer py-3.5 px-3 mb-1 last:mb-0 transition-colors',
                option.id === 'PENDING' &&
                  'text-amber-600 bg-amber-50/50 focus:bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10',
                option.id === 'ACTIVE' &&
                  'text-blue-600 bg-blue-50/50 focus:bg-blue-100 dark:text-blue-400 dark:bg-blue-500/10',
                option.id === 'CONFIRMED' &&
                  'text-indigo-600 bg-indigo-50/50 focus:bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-500/10',
                option.id === 'COMPLETED' &&
                  'text-emerald-600 bg-emerald-50/50 focus:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10',
                option.id === 'CANCELLED' &&
                  'text-rose-600 bg-rose-50/50 focus:bg-rose-100 dark:text-rose-400 dark:bg-rose-500/10',
              )}
            >
              <option.icon
                size={16}
                strokeWidth={option.id === 'PENDING' ? 3 : 2}
              />
              {option.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
