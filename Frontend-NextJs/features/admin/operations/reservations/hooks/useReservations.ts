'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationService } from '../services/reservation.service';
import { BookingStatus } from '@/common/enums/booking-status.enum';
import toast from 'react-hot-toast';
import { ReservationFilters } from '../types/reservation.types';

export const useReservations = () => {
  const queryClient = useQueryClient();

  // 1. MANAGE FILTER STATE INTERNALLY
  const [filters, setFilters] = useState<ReservationFilters>({
    page: 1,
    limit: 10,
    status: undefined as BookingStatus | undefined,
    fromDate: '',
    toDate: '',
    minTotalAmount: '',
    maxTotalAmount: '',
  });

  // 2. FETCH STATS
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['reservations-stats'],
    queryFn: () => reservationService.getStats(),
  });

  // 3. FETCH RESERVATIONS
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reservations', filters],
    queryFn: () => {
      // CLEAN FILTERS - REMOVE EMPTY STRINGS
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
      );
      return reservationService.getAll(cleanParams);
    },
  });

  // 4. UPDATE STATUS
  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: BookingStatus }) =>
      reservationService.update(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Status updated successfully');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Could not update status';
      toast.error(message);
    },
  });

  // 5. DELETE RESERVATION
  const deleteReservation = useMutation({
    mutationFn: (id: number) => reservationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['reservations-stats'] });
      toast.success('Reservation deleted successfully');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Could not delete reservation';
      toast.error(message);
    },
  });

  // 6. HELPER FUNCTIONS
  const setFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1,
    }));
  };

  const clearFilters = () =>
    setFilters({
      page: 1,
      limit: 10,
      status: undefined,
      fromDate: '',
      toDate: '',
      minTotalAmount: '',
      maxTotalAmount: '',
    });

  return {
    stats: stats?.data,
    isStatsLoading,
    reservations: data?.data.data || [],
    meta: data?.data.meta,
    isLoading,
    isError: isError || stats?.isError,
    filters,
    setFilter,
    clearFilters,
    updateStatus: updateStatus.mutate,
    isUpdating: updateStatus.isPending,
    deleteReservation: deleteReservation.mutate,
    isDeleting: deleteReservation.isPending,
    refetch: () =>
      queryClient.invalidateQueries({ queryKey: ['reservations'] }),
  };
};
