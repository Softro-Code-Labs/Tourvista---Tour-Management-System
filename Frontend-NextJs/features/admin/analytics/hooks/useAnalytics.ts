'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { analyticsService } from '../services/analytics.service';

export const useAnalytics = () => {
  const queryClient = useQueryClient();

  // FETCH METRICS
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['admin-dashboard-metrics'],
    queryFn: () => analyticsService.getMetrics(),
    placeholderData: (previousData) => previousData,
  });

  // CLEAN REFRESH TRIGGER
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['admin-dashboard-metrics'] });

  return {
    // Flatten data out matching your specific template structure
    cards: data?.data?.cards,
    monthlyData: data?.data?.monthlyData || [],

    // Status Trackers
    isLoading,
    isError,
    errorMessage: error instanceof Error ? error.message : 'An error occurred',

    // Core Refetch handler
    refetch,
  };
};
