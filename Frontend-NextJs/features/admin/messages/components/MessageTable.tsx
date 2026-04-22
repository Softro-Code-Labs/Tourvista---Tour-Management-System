'use client';

import React, { useState } from 'react';
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

import { Mail, MailOpen, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

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

  const toggleRow = (id: number) => {
    setOpenRow((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-500 dark:text-white/60">
        Loading messages...
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="p-6 text-center text-slate-500 dark:text-white/60">
        No messages found
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:bg-slate-950 dark:border-white/10 transition-colors">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 dark:border-white/10 dark:hover:bg-white/5">
            <TableHead />
            <TableHead>Subject</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {messages.map((msg) => {
            const isOpen = openRow === msg.id;

            return (
              <React.Fragment key={msg.id}>
                <TableRow
                  onClick={() => toggleRow(msg.id)}
                  className={`
                    cursor-pointer transition-colors border-slate-200
                    hover:bg-slate-50 dark:hover:bg-white/5
                    dark:border-white/10 
                    ${!msg.isRead ? 'bg-slate-50 dark:bg-white/5' : ''}
                  `}
                >
                  <TableCell>
                    {msg.isRead ? (
                      <MailOpen className="w-4 h-4 text-slate-400 dark:text-white/50" />
                    ) : (
                      <Mail className="w-4 h-4 text-blue-500" />
                    )}
                  </TableCell>

                  <TableCell className="truncate max-w-[250px]">
                    {msg.subject}
                  </TableCell>

                  <TableCell className="text-sm text-slate-500 dark:text-white/60">
                    {msg.email}
                  </TableCell>

                  <TableCell>
                    <Badge variant={msg.isRead ? 'secondary' : 'default'}>
                      {msg.isRead ? 'Read' : 'Unread'}
                    </Badge>
                  </TableCell>

                  <TableCell
                    className="text-right space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onToggleReadStatus(msg.id)}
                    >
                      {msg.isRead ? (
                        <Mail className="w-4 h-4" />
                      ) : (
                        <MailOpen className="w-4 h-4" />
                      )}
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete(msg.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>

                    <Button size="icon" variant="ghost">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>

                {isOpen && (
                  <TableRow className="bg-slate-50 dark:bg-white/5">
                    <TableCell colSpan={5}>
                      <div className="p-4 space-y-2">
                        <p className="text-slate-500 dark:text-white/60">
                          From: {msg.name} ({msg.email})
                        </p>

                        <p className="text-slate-500 dark:text-white/60">
                          Date: {msg.createdAt}
                        </p>

                        <div className="p-3 mt-3 border border-slate-200 rounded-lg bg-white dark:bg-slate-900 dark:border-white/10">
                          <p className="text-sm whitespace-pre-line">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
