'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMessages,
  markMessageRead,
  deleteMessageById,
  getMessageStats,
} from '../services/inquiries.service';
import { Message, MessageFilters } from '../types/inquiries.type';
import toast from 'react-hot-toast';

export function useMessages() {
  const queryClient = useQueryClient();

  // 1. Local state managed exclusively for client filter inputs
  const [filters, setFilters] = useState<MessageFilters>({
    page: 1,
    limit: 10,
    search: '',
    isRead: 'false',
    fromDate: '',
    toDate: '',
  });

  const setFilter = (
    key: keyof MessageFilters,
    value: MessageFilters[keyof MessageFilters],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? (value as number) : 1, // Reset page to 1 on filter changes
    }));
  };

  // Helper to remove blank parameters
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
  );

  // 2. Query: Fetching message lists dynamically tied to filter state
  const { data: messageResponse, isLoading: loading } = useQuery({
    queryKey: ['messages', cleanFilters],
    queryFn: async () => {
      const res = await getMessages(cleanFilters);
      if (!res.success) {
        throw new Error(res.message || 'Unknown error');
      }
      return res.data;
    },
    placeholderData: (previousData) => previousData, // Keeps previous list visible during background fetches
  });

  // 3. Query: Fetching message summary metrics/statistics
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['messages', 'stats'],
    queryFn: async () => {
      const res = await getMessageStats();
      if (!res.success) {
        throw new Error(res.message || 'Unknown error');
      }
      return res.data; // Expected format: { total: number, read: number, unread: number }
    },
  });

  // 4. Mutation: Toggling read status with Optimistic Updates
  // 4. Mutation: Toggling read status with Optimistic Updates
  const toggleReadStatusMutation = useMutation({
    mutationFn: async ({ id, isRead }: { id: number; isRead: boolean }) => {
      return markMessageRead(id, isRead);
    },
    onMutate: async ({ id, isRead }) => {
      await queryClient.cancelQueries({ queryKey: ['messages'] });

      // 1. Get the actual cached response structure
      const previousCachedData = queryClient.getQueryData<any>([
        'messages',
        cleanFilters,
      ]);

      if (previousCachedData) {
        // 2. Safely handle both structure possibilities to avoid runtime crash exceptions
        let updatedData;

        if (Array.isArray(previousCachedData)) {
          // If the cache is a flat array
          updatedData = previousCachedData.map((m) =>
            m.id === id ? { ...m, isRead } : m,
          );
        } else if (
          previousCachedData.data &&
          Array.isArray(previousCachedData.data)
        ) {
          // If the cache is nested inside an object envelope { data: [...], meta: ... }
          updatedData = {
            ...previousCachedData,
            data: previousCachedData.data.map((m: any) =>
              m.id === id ? { ...m, isRead } : m,
            ),
          };
        }

        if (updatedData) {
          queryClient.setQueryData(['messages', cleanFilters], updatedData);
        }
      }

      return { previousCachedData };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousCachedData) {
        queryClient.setQueryData(
          ['messages', cleanFilters],
          context.previousCachedData,
        );
      }
      toast.error(err.message || 'Failed to update message status');
    },
    onSuccess: (_, variables) => {
      toast.success(
        `Message marked as ${variables.isRead ? 'read' : 'unread'}`,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  // 5. Mutation: Message deletion sequence
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteMessageById(id);
      if (!res.success && !res.id) {
        throw new Error(res.message || 'Unknown error');
      }
      return res;
    },
    onSuccess: () => {
      toast.success('Message deleted successfully');
    },
    onError: (err: any) => {
      toast.error('Failed to delete message - ' + err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  // Safely abstract parameters down to match previous template signatures
  const toggleReadStatus = async (id: number) => {
    const currentMessages = messageResponse?.data || [];
    const message = currentMessages.find((m: Message) => m.id === id);
    if (!message) return;
    toggleReadStatusMutation.mutate({ id, isRead: !message.isRead });
  };

  const deleteMessage = async (id: number) => {
    return deleteMessageMutation
      .mutateAsync(id)
      .then(() => true)
      .catch(() => false);
  };

  return {
    messages: messageResponse?.data || [],
    meta: messageResponse?.meta || {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
    loading,

    stats: stats || { total: 0, read: 0, unread: 0 },
    loadingStats,

    filters,
    setFilter,

    fetchMessages: () =>
      queryClient.invalidateQueries({ queryKey: ['messages'] }),
    toggleReadStatus,

    deleteMessage,
    isDeleting: deleteMessageMutation.isPending,
  };
}
