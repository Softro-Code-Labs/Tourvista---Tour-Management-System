'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  getMessages,
  markMessageRead,
  deleteMessageById,
} from '../services/message.service';
import { Message, MessageFilters } from '../types/message.types';
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
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMessages(filters);
      setMessages(res.data);
      setTotal(res.meta.total);
      setTotalPages(res.meta.totalPages);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const toggleReadStatus = async (id: number) => {
    const message = messages.find((m) => m.id === id);
    if (!message) return;

    const newStatus = !message.isRead;
    try {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: newStatus } : m)),
      );

      await markMessageRead(id, newStatus);
      toast.success(`Message marked as ${newStatus ? 'read' : 'unread'}`);
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: !newStatus } : m)),
      );
      toast.error(err.message);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure?')) return;
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
  }, [fetchMessages]);

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
