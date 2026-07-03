'use client';

import { useState, useEffect, useCallback } from 'react';
import { packageService } from '../services/package.service';
import {
  Package,
  PackageFilters,
  PackagesResponse,
} from '../types/package.types';
import toast from 'react-hot-toast';

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const [meta, setMeta] = useState<PackagesResponse['data']['meta']>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  });

  const [filters, setFilters] = useState<Omit<PackageFilters, 'isActive'>>({
    page: 1,
    limit: 12,
    search: '',
    minPrice: '',
    maxPrice: '',
  });

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
      );

      const res = await packageService.getAll({
        ...cleanFilters,
        isActive: true,
      });

      if (res.success) {
        setPackages(res.data.data);
        setMeta(res.data.meta);
      } else {
        toast.error(
          `Failed to load packages - ${res.message || 'Unknown error'}`,
        );
      }
    } catch (error) {
      toast.error(
        `Error connecting to server - ${(error as Error).message || 'Unknown error'}`,
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const setFilter = (
    key: keyof PackageFilters,
    value: PackageFilters[keyof PackageFilters],
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
      search: '',
      minPrice: '',
      maxPrice: '',
    });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPackages();
    }, 400);

    return () => clearTimeout(timer);
  }, [filters]);

  return {
    packages,
    meta,

    filters,
    setFilter,
    clearFilters,

    refresh: fetchPackages,
    loading,
  };
}
