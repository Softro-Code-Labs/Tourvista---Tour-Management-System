import { useState, useEffect, useCallback } from 'react';
import { tourService } from '../services/tour.service';
import {
  Tour,
  TourStats,
  TourFilters,
  TourResponse,
} from '../types/tour.types';
import toast from 'react-hot-toast';

export function useTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<TourStats>({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [meta, setMeta] = useState<TourResponse['data']['meta']>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<TourFilters>({
    page: 1,
    limit: 10,
    search: '',
    isActive: undefined,
    minPrice: '',
    maxPrice: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await tourService.getStats();
      if (res.success) {
        setStats(res.data);
      } else {
        toast.error(
          'Failed to load tour statistics - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load tour statistics - ' + (err.message || 'Unknown error'),
      );
    }
  };

  const fetchTours = useCallback(async () => {
    setIsLoading(true);
    try {
      // CLEAN FILTERS TO AVOID SENDING UNNECESSARY QUERY PARAMS
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
      );

      const res = await tourService.getAll(cleanFilters);
      if (res.success) {
        setTours(res.data.data);
        setMeta(res.data.meta);
      } else {
        toast.error(
          'Failed to load tours plans - ' + (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load tours plans - ' + (err.message || 'Unknown error'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const setFilter = (
    key: keyof TourFilters,
    value: TourFilters[keyof TourFilters],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? (value as number) : 1,
    }));
  };

  const deleteTour = async (id: number) => {
    setIsDeleting(true);
    try {
      const res = await tourService.delete(id);
      if (res.success || res.id) {
        toast.success('Tour plan deleted successfully');
        fetchTours();
        fetchStats();
        return true;
      } else {
        toast.error(
          'Failed to delete tour plan - ' + (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to delete tour plan - ' + (err.message || 'Unknown error'),
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const clearFilters = () =>
    setFilters({
      page: 1,
      limit: 10,
      search: '',
      isActive: undefined,
      minPrice: '',
      maxPrice: '',
    });

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchTours, 400);
    return () => clearTimeout(timer);
  }, [filters]);

  return {
    tours,
    meta,
    isLoading,
    stats,

    filters,
    setFilter,
    clearFilters,

    isDeleting,
    deleteTour,

    refresh: { fetchTours, fetchStats },
  };
}
