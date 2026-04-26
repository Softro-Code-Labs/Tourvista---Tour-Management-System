'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  getMessages,
  markMessageRead,
  deleteMessageById,
} from '../services/message.service';
import {
  Message,
  MessageFilters,
  MessageResponse,
} from '../types/message.types';
import toast from 'react-hot-toast';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<MessageResponse['meta']>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<MessageFilters>({
    page: 1,
    limit: 10,
    search: '',
    isRead: 'false',
    fromDate: '',
    toDate: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const setFilter = (
    key: keyof MessageFilters,
    value: MessageFilters[keyof MessageFilters],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? (value as number) : 1,
    }));
  };

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      // CLEAN FILTERS TO AVOID SENDING UNNECESSARY QUERY PARAMS
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
      );

      const res = await getMessages(cleanFilters);
      if (res.success) {
        setMessages(res.data.data);
        setMeta(res.data.meta);
      } else {
        toast.error(
          'Failed to load messages - ' + (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load messages - ' + (err.message || 'Unknown error'),
      );
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
    setIsDeleting(true);
    try {
      const res = await deleteMessageById(id);
      if (res.success || res.id) {
        toast.success('Message deleted successfully');
        fetchMessages();
        return true;
      } else {
        toast.error(
          'Failed to delete message - ' + (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to delete message - ' + (err.message || 'Unknown error'),
      );
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    meta,
    loading,

    filters,
    setFilter,

    fetchMessages,
    toggleReadStatus,

    deleteMessage,
    isDeleting,
  };
}
