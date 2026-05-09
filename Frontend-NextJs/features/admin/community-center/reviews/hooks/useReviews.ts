'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsService } from '../services/reviews.service';
import toast from 'react-hot-toast';
import { ReviewFilters } from '../types/reviews.type';
import { useState } from 'react';

export const useReviewsAdmin = () => {
  const queryClient = useQueryClient();

  // 1. MANAGE FILTER STATE INTERNALLY
  const [filters, setFilters] = useState<ReviewFilters>({
    page: 1,
    limit: 10,
    search: '',
    isVisible: undefined as boolean | undefined,
    isFeatured: undefined as boolean | undefined,
    fromDate: '',
    toDate: '',
  });

  // 2. FETCH STATS
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['reviews-stats'],
    queryFn: () => reviewsService.getStats(),
  });

  // 3. Fetching logic for the Admin List
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reviews', 'admin', filters],
    queryFn: () => {
      // CLEAN FILTERS - REMOVE EMPTY STRINGS
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
      );

      return reviewsService.getAll(cleanParams);
    },
    placeholderData: (previousData) => previousData,
  });

  // 4. Toggle Visibility Mutation
  const toggleVisibility = useMutation({
    mutationFn: ({ id, isVisible }: { id: number; isVisible: boolean }) =>
      reviewsService.updateVisibility(id, isVisible),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success(
        `Review is now ${variables.isVisible ? 'visible' : 'hidden'}`,
      );
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to update visibility',
      );
    },
  });

  // 5. Toggle Featured Mutation
  const toggleFeatured = useMutation({
    mutationFn: ({ id, isFeatured }: { id: number; isFeatured: boolean }) =>
      reviewsService.updateFeatured(id, isFeatured),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success(
        variables.isFeatured ? 'Review featured!' : 'Removed from featured',
      );
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to update featured status',
      );
    },
  });

  // 6. Delete Mutation
  const deleteReview = useMutation({
    mutationFn: (id: number) => reviewsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Review deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete review');
    },
  });

  // 7. HELPER FUNCTIONS
  const setFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1,
    }));
  };

  // 8. CLEAR FILTERS
  const clearFilters = () =>
    setFilters({
      page: 1,
      limit: 10,
      search: '',
      isVisible: undefined,
      isFeatured: undefined,
      fromDate: '',
      toDate: '',
    });

  return {
    // Stats Data
    stats: stats?.data,
    isStatsLoading,

    // Reviews Data
    reviews: data?.data.data || [],
    meta: data?.data?.meta,
    isLoading,
    isError,

    // Filters
    filters,
    setFilter,
    clearFilters,

    // Mutations
    updateVisibility: toggleVisibility.mutateAsync,
    isUpdatingVisibility: toggleVisibility.isPending,
    updateFeatured: toggleFeatured.mutateAsync,
    isUpdatingFeatured: toggleFeatured.isPending,
    deleteReview: deleteReview.mutateAsync,
    isDeleting: deleteReview.isPending,

    // Refetch
    refetch: () => queryClient.invalidateQueries({ queryKey: ['reviews'] }),
  };
};
