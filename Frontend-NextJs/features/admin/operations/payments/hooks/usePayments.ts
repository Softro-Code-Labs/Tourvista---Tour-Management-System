'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '../services/payments.service';
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
    search: '',
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

  // 4. REFUND MUTATION
  const refundMutation = useMutation({
    mutationFn: ({
      paymentId,
      amount,
    }: {
      paymentId: number;
      amount: number;
    }) => paymentService.refund(paymentId, amount),
    onSuccess: () => {
      // Automatically refresh table data & counters smoothly
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payments-stats'] });
    },
  });

  // 5. HELPER FUNCTIONS
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

    // Refund
    refundPayment: (paymentId: number, amount: number) =>
      refundMutation.mutateAsync({ paymentId, amount }),
    isRefunding: refundMutation.isPending,

    // Refetch
    refetch: () => queryClient.invalidateQueries({ queryKey: ['payments'] }),
  };
};
