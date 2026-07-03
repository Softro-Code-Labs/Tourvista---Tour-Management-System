'use client';

import { useState, useEffect, useCallback } from 'react';
import { reservationService } from '../services/reservations.service';
import {
  Reservation,
  ReservationFilters,
  ReservationResponse,
} from '../types/reservations.type';
import toast from 'react-hot-toast';

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdatingNotes, setIsUpdatingNotes] = useState(false);

  const [meta, setMeta] = useState<ReservationResponse['data']['meta']>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  });

  const [filters, setFilters] = useState<ReservationFilters>({
    page: 1,
    limit: 12,
  });

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, v]) => v !== ('' as any) && v !== undefined,
        ),
      );

      const res = await reservationService.getAll(cleanFilters);

      if (res.success) {
        setReservations(res.data.data);
        setMeta(res.data.meta);
      } else {
        toast.error(
          `Failed to fetch reservations - ${res.message || 'Unknown error'}`,
        );
      }
    } catch (error) {
      toast.error(
        `Server error fetching reservations - ${(error as Error).message || 'Unknown error'}`,
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateReservationNotes = async (id: number, notes: string) => {
    setIsUpdatingNotes(true);
    try {
      const res = await reservationService.updateNotes(id, notes);
      if (res.success) {
        toast.success('Notes updated successfully');
        await fetchReservations(); // Refresh local list state
        return true;
      } else {
        toast.error(
          `Failed to update notes: ${res.message || 'Unknown error'}`,
        );
        return false;
      }
    } catch (error) {
      toast.error(`Error saving notes: ${(error as Error).message}`);
      return false;
    } finally {
      setIsUpdatingNotes(false);
    }
  };

  const setFilter = (
    key: keyof ReservationFilters,
    value: ReservationFilters[keyof ReservationFilters],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? (value as number) : 1,
    }));
  };

  const clearFilters = () =>
    setFilters({
      page: 1,
      limit: 12,
    });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReservations();
    }, 400);

    return () => clearTimeout(timer);
  }, [filters]);

  return {
    reservations,
    meta,

    filters,
    setFilter,
    clearFilters,

    updateReservationNotes,
    isUpdatingNotes,

    onRefresh: fetchReservations,
    onLoading: loading,
  };
}
