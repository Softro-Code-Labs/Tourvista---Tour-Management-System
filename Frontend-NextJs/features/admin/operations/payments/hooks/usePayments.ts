'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '../services/payments.service';
import toast from 'react-hot-toast';
import { PaymentFilters } from '../types/payments.type';
import { useState } from 'react';
import { PaymentType } from '@/common/enums/payment-type.enum';
import { PaymentStatus } from '@/common/enums/payment-status.enum';

export const usePaymentsAdmin = () => {
  const queryClient = useQueryClient();

  // 1. MANAGE FILTER STATE INTERNALLY
  const [filters, setFilters] = useState<PaymentFilters>({
    page: 1,
    limit: 10,
    minAmount: undefined as number | undefined,
    maxAmount: undefined as number | undefined,
    type: undefined as PaymentType | undefined,
    status: undefined as PaymentStatus | undefined,
    fromDate: undefined as string | undefined,
    toDate: undefined as string | undefined,
  });

  // 2. FETCH STATS
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['payments-stats'],
    queryFn: () => paymentService.getStats(),
  });

  // 3. Fetching logic for the Admin List
  const { data, isLoading, isError } = useQuery({
    queryKey: ['payments', 'admin', filters],
    queryFn: () => {
      // CLEAN FILTERS - REMOVE EMPTY STRINGS
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
      );

      return paymentService.getAll(cleanParams);
    },
    placeholderData: (previousData) => previousData,
  });

  // 4. HELPER FUNCTIONS
  const setFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1,
    }));
  };

  // 5. CLEAR FILTERS
  const clearFilters = () =>
    setFilters({
      page: 1,
      limit: 10,
      minAmount: undefined,
      maxAmount: undefined,
      type: undefined,
      status: undefined,
      fromDate: undefined,
      toDate: undefined,
    });

  return {
    // Stats Data
    stats: stats?.data,
    isStatsLoading,

    // Payments Data
    payments: data?.data.data || [],
    meta: data?.data?.meta,
    isLoading,
    isError,

    // Filters
    filters,
    setFilter,
    clearFilters,

    // Refetch
    refetch: () => queryClient.invalidateQueries({ queryKey: ['payments'] }),
  };
};
