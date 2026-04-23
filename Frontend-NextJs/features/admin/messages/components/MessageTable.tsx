'use client';

import React, { useState } from 'react';
import { Mail, MailOpen, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Message } from '../types/message.types';

type Props = {
  messages: Message[];
  loading?: boolean;
  onToggleReadStatus: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function MessageTable({
  messages,
  loading,
  onToggleReadStatus,
  onDelete,
}: Props) {
  const [openRow, setOpenRow] = useState<number | null>(null);

  if (loading) return <EmptyState message="Loading messages..." />;
  if (!messages.length) return <EmptyState message="No messages found" />;

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:bg-slate-950 dark:border-white/10 transition-colors">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 dark:border-white/10 dark:hover:bg-white/5">
            <TableHead className="w-[50px]" />
            <TableHead>Subject</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {messages.map((msg) => (
            <MessageRow
              key={msg.id}
              message={msg}
              isOpen={openRow === msg.id}
              onToggle={() => setOpenRow(openRow === msg.id ? null : msg.id)}
              onToggleRead={onToggleReadStatus}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function MessageRow({
  message,
  isOpen,
  onToggle,
  onToggleRead,
  onDelete,
}: {
  message: Message;
  isOpen: boolean;
  onToggle: () => void;
  onToggleRead: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <>
      <TableRow
        onClick={onToggle}
        className={cn(
          'cursor-pointer transition-colors border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5',
          !message.isRead && 'bg-slate-50/50 dark:bg-white/5',
        )}
      >
        <TableCell>
          {message.isRead ? (
            <MailOpen className="w-4 h-4 text-slate-400 dark:text-white/50" />
          ) : (
            <Mail className="w-4 h-4 text-blue-500" />
          )}
        </TableCell>

        <TableCell className="font-medium truncate max-w-[250px]">
          {message.subject}
        </TableCell>

        <TableCell className="text-sm text-slate-500 dark:text-white/60">
          {message.email}
        </TableCell>

        <TableCell>
          <Badge variant={message.isRead ? 'secondary' : 'default'}>
            {message.isRead ? 'Read' : 'Unread'}
          </Badge>
        </TableCell>

        <TableCell
          className="text-right space-x-1"
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
            onClick={() => onDelete(message.id)}
            icon={<Trash2 className="w-4 h-4 text-red-500" />}
          />
          <ActionButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )
            }
          />
        </TableCell>
      </TableRow>

      {isOpen && (
        <TableRow className="bg-slate-50/30 dark:bg-white/[0.02] hover:bg-slate-50/30 dark:hover:bg-white/[0.02]">
          <TableCell colSpan={5}>
            <div className="p-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-slate-500 dark:text-white/40 gap-1">
                <span>
                  From:{' '}
                  <b className="text-slate-700 dark:text-white/70">
                    {message.name}
                  </b>{' '}
                  ({message.email})
                </span>
                <span>Sent on: {message.createdAt}</span>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl bg-white dark:bg-slate-900 dark:border-white/10 shadow-sm">
                <p className="text-sm leading-relaxed whitespace-pre-line text-slate-700 dark:text-white/80">
                  {message.message}
                </p>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function ActionButton({
  onClick,
  icon,
}: {
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onClick}>
      {icon}
    </Button>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="p-12 text-center text-sm text-slate-500 dark:text-white/50">
      {message}
    </div>
  );
}
