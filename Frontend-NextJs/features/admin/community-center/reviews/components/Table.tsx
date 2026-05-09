'use client';

import {
  Star,
  Trash2,
  Eye,
  EyeOff,
  Trophy,
  User,
  Mail,
  MapPin,
  Quote,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Props {
  data: any[];
  onVisibilityChange: (id: number, visibility: boolean) => void;
  onFeaturedChange: (id: number, featured: boolean) => void;
  onDelete: (id: number) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function ReviewsTable({
  data,
  onVisibilityChange,
  onFeaturedChange,
  onDelete,
  isUpdating,
  isDeleting,
}: Props) {
  return (
    <div className="w-full space-y-6">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden xl:block overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl shadow-slate-200/20 dark:shadow-none">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-900/80">
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Traveler Info
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Tour Details
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Rating & Feedback
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">
                Curation
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {data.map((item) => (
              <ReviewRow
                key={item.id}
                item={item}
                onVisibilityChange={onVisibilityChange}
                onFeaturedChange={onFeaturedChange}
                onDelete={onDelete}
                isUpdating={isUpdating}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item) => (
          <ReviewCard
            key={item.id}
            item={item}
            onVisibilityChange={onVisibilityChange}
            onFeaturedChange={onFeaturedChange}
            onDelete={onDelete}
            isUpdating={isUpdating}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * DESKTOP ROW COMPONENT
 */
function ReviewRow({
  item,
  onVisibilityChange,
  onFeaturedChange,
  onDelete,
  isUpdating,
}: any) {
  return (
    <tr className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
      <td className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-black text-xs">
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
          <span className="font-bold text-[13px] text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <MapPin size={12} className="text-indigo-500" /> {item.tour?.title}
          </span>
          <span className="text-[10px] font-black uppercase text-slate-400 mt-1">
            Posted: {format(new Date(item.createdAt), 'MMM dd, yyyy')}
          </span>
        </div>
      </td>

      <td className="p-5 max-w-xs">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge className="bg-amber-400 hover:bg-amber-400 text-slate-900 font-black text-[10px] px-2 py-0">
            {item.rating}.0 <Star size={8} className="ml-1 fill-slate-900" />
          </Badge>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 italic">
          "{item.comment}"
        </p>
      </td>

      <td className="p-5">
        <div className="flex justify-center items-center gap-2">
          {/* Featured Toggle */}
          <button
            onClick={() => onFeaturedChange(item.id, !item.isFeatured)}
            disabled={isUpdating}
            className={cn(
              'p-2.5 rounded-2xl border transition-all active:scale-90',
              item.isFeatured
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-300 hover:text-amber-500',
            )}
          >
            <Trophy
              size={16}
              className={item.isFeatured ? 'fill-amber-500' : ''}
            />
          </button>

          {/* Visibility Toggle */}
          <button
            onClick={() => onVisibilityChange(item.id, !item.isVisible)}
            disabled={isUpdating}
            className={cn(
              'p-2.5 rounded-2xl border transition-all active:scale-90',
              item.isVisible
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-500',
            )}
          >
            {item.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </td>

      <td className="p-5 text-right">
        <button
          onClick={() => onDelete(item.id)}
          className="p-2.5 rounded-2xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}

/**
 * MOBILE CARD COMPONENT
 */
function ReviewCard({
  item,
  onVisibilityChange,
  onFeaturedChange,
  onDelete,
  isUpdating,
}: any) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-black">
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
        <button
          onClick={() => onDelete(item.id)}
          className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-indigo-500" />
            <span className="font-bold text-xs text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
              {item.tour?.title}
            </span>
          </div>
          <Badge className="bg-amber-400 text-slate-900 font-black text-[10px]">
            {item.rating}.0 <Star size={8} className="ml-1 fill-slate-900" />
          </Badge>
        </div>

        <div className="relative p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
          <Quote
            size={20}
            className="absolute -top-2 -left-1 text-slate-200 dark:text-slate-700 -rotate-12"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
            {item.comment}
          </p>
        </div>
      </div>

      <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase text-slate-400">
          {format(new Date(item.createdAt), 'dd MMM yyyy')}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onFeaturedChange(item.id, !item.isFeatured)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all',
              item.isFeatured
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-transparent border-slate-200 text-slate-400',
            )}
          >
            <Trophy size={12} /> {item.isFeatured ? 'Featured' : 'Feature'}
          </button>

          <button
            onClick={() => onVisibilityChange(item.id, !item.isVisible)}
            className={cn(
              'p-2 rounded-xl border transition-all',
              item.isVisible
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : 'bg-rose-50 text-rose-600 border-rose-100',
            )}
          >
            {item.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
