'use client';

import { useEffect, useState } from 'react';
import {
  getMessages,
  markMessageRead,
  deleteMessageById,
} from '../services/message.service';

import { Message, MessageFilters } from '../types/message.types';
import { messageFilterSchema } from '../schemas/message.filter.schema';

import toast from 'react-hot-toast';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<MessageFilters>({
    page: 1,
    limit: 10,
    search: '',
    isRead: 'all',
    fromDate: '',
    toDate: '',
  });

  const setFilter = <K extends keyof MessageFilters>(
    key: K,
    value: MessageFilters[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const buildQuery = () => {
    const params = new URLSearchParams();

    const parsed = messageFilterSchema.safeParse({
      page: filters.page,
      limit: filters.limit,

      search: filters.search || undefined,
      isRead: filters.isRead === 'all' ? undefined : filters.isRead === 'true',
      fromDate: filters.fromDate ? new Date(filters.fromDate) : undefined,
      toDate: filters.toDate ? new Date(filters.toDate) : undefined,
    });

    if (!parsed.success) {
      toast.error(parsed.error.toString());
      return '';
    }

    const data = parsed.data;

    params.append('page', String(data.page));
    params.append('limit', String(data.limit));

    if (data.search) params.append('search', data.search);
    if (typeof data.isRead === 'boolean') {
      params.append('isRead', String(data.isRead));
    }
    if (data.fromDate) {
      params.append('fromDate', data.fromDate.toISOString());
    }
    if (data.toDate) {
      params.append('toDate', data.toDate.toISOString());
    }

    return params.toString();
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await getMessages(buildQuery());
      setMessages(res.data || []);
      setTotalPages(res.meta?.totalPages || 1);
      setTotal(res.meta?.total || 0);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id: number) => {
    try {
      const message = messages.find((m) => m.id === id);
      if (!message) {
        toast.error('Message not found to toggle status');
        return;
      }
      const newStatus = !message.isRead;

      await markMessageRead(id, newStatus);
      toast.success(
        newStatus
          ? 'Marked as read successfully'
          : 'Marked as unread successfully',
      );

      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: newStatus } : m)),
      );
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      await deleteMessageById(id);
      toast.success('Message deleted successfully');
      fetchMessages();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filters]);

  return {
    messages,
    loading,

    filters,
    setFilter,

    total,
    totalPages,

    fetchMessages,
    toggleReadStatus,
    deleteMessage,
  };
}
