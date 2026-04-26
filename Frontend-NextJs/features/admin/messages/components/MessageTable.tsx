'use client';

import { useState } from 'react';
import {
  Mail,
  MailOpen,
  Trash2,
  ChevronDown,
  Loader2,
  Inbox,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Message } from '../types/message.types';

type Props = {
  messages: Message[];
  loading?: boolean;
  onToggleReadStatus: (id: number) => void;
  onDelete: (message: Message) => void;
};

export default function MessageTable({
  messages,
  loading,
  onToggleReadStatus,
  onDelete,
}: Props) {
  const [openRow, setOpenRow] = useState<number | null>(null);

  if (loading)
    return (
      <EmptyState
        icon={<Loader2 className="animate-spin text-blue-500" />}
        title="Syncing Inquiries"
        subtitle="Refreshing your message stream..."
      />
    );
  if (!messages.length)
    return (
      <EmptyState
        icon={<Inbox size={48} className="text-slate-200" />}
        title="Inbox Zero"
        subtitle="All customer inquiries have been managed."
      />
    );

  return (
    <div className="flex flex-col gap-4 pb-10">
      {messages.map((msg) => (
        <MessageCard
          key={msg.id}
          message={msg}
          isOpen={openRow === msg.id}
          onToggle={() => setOpenRow(openRow === msg.id ? null : msg.id)}
          onToggleRead={onToggleReadStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function MessageCard({
  message,
  isOpen,
  onToggle,
  onToggleRead,
  onDelete,
}: any) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden transition-all duration-300 rounded-[2rem] border',
        !message.isRead
          ? 'bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900/30 shadow-md shadow-blue-500/5'
          : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800',
      )}
    >
      {/* SIDEBAR INDICATOR */}
      {!message.isRead && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-r-full" />
      )}

      {/* MAIN ROW */}
      <div
        onClick={onToggle}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-6 cursor-pointer"
      >
        <div className="flex items-center gap-5 flex-1 w-full">
          {/* Avatar Icon */}
          <div
            className={cn(
              'h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-all',
              !message.isRead
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400',
            )}
          >
            {message.isRead ? (
              <MailOpen size={20} />
            ) : (
              <Mail size={20} strokeWidth={2.5} />
            )}
          </div>

          <div className="space-y-1 overflow-hidden">
            <div className="flex items-center gap-3">
              <h3
                className={cn(
                  'text-base tracking-tight truncate',
                  !message.isRead
                    ? 'font-black text-slate-900 dark:text-white'
                    : 'font-bold text-slate-500',
                )}
              >
                {message.subject}
              </h3>
              {!message.isRead && (
                <Badge className="bg-blue-500/10 text-blue-600 border-none text-[9px] font-black tracking-widest uppercase px-2 py-0">
                  NEW
                </Badge>
              )}
            </div>
            <p className="text-xs font-medium text-slate-400 flex items-center gap-2">
              <span className="font-bold text-slate-600 dark:text-slate-300">
                {message.name}
              </span>
              <span className="opacity-40">•</span>
              {message.email}
            </p>
          </div>
        </div>

        {/* RIGHT SECTION: DATE & ACTIONS */}
        <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-6">
          <div className="text-right hidden sm:flex flex-col items-end gap-1 px-4 border-l border-slate-100 dark:border-slate-800">
            {/* DATE */}
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-900 dark:text-white leading-none">
              {new Date(message.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>

            {/* TIME */}
            <div className="flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full bg-blue-500/50" />
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">
                {new Date(message.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <ActionButton
              onClick={() => onToggleRead(message.id)}
              icon={
                message.isRead ? (
                  <Mail className="w-4 h-4" />
                ) : (
                  <MailOpen className="w-4 h-4" />
                )
              }
            />
            <ActionButton
              onClick={() => onDelete(message)}
              icon={<Trash2 className="w-4 h-4" />}
              isDanger
            />
            <div
              className={cn(
                'transition-transform duration-300 ml-2',
                isOpen ? 'rotate-180' : '',
              )}
            >
              <ChevronDown size={20} className="text-slate-300" />
            </div>
          </div>
        </div>
      </div>

      {/* EXPANDED MESSAGE VIEW */}
      {isOpen && (
        <div className="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-slate-50/50 dark:bg-slate-800/40 rounded-[1.5rem] p-6 border border-slate-100/50 dark:border-slate-700/30">
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight size={14} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600/50">
                Message Content
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line font-medium">
              {message.message}
            </p>

            <div className="mt-8 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl font-bold text-xs gap-2 border-slate-200 dark:border-slate-700 cursor-pointer"
                onClick={() =>
                  (window.location.href = `mailto:${message.email}`)
                }
              >
                Reply via Email
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({ onClick, icon, isDanger }: any) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        'h-9 w-9 rounded-xl transition-all cursor-pointer',
        isDanger
          ? 'hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10'
          : 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10',
        'text-slate-400',
      )}
    >
      {icon}
    </Button>
  );
}

function EmptyState({ icon, title, subtitle }: any) {
  return (
    <div className="flex flex-col items-center justify-center p-20 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/30">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
        {title}
      </h3>
      <p className="text-xs font-medium text-slate-400 mt-1">{subtitle}</p>
    </div>
  );
}
