'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../services/users.service';
import toast from 'react-hot-toast';
import { UserFilters } from '../types/users.type';
import { useState } from 'react';
import { UserRole } from '@/common/enums/role.enum';

export const useUsersAdmin = () => {
  const queryClient = useQueryClient();

  // 1. MANAGE FILTER STATE INTERNALLY
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
    search: '',
    role: undefined,
    fromDate: '',
    toDate: '',
  });

  // 2. FETCH STATS
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['users-stats'],
    queryFn: () => usersService.getStats(),
  });

  // 3. Fetching logic for the Admin List
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', 'admin', filters],
    queryFn: () => {
      // CLEAN FILTERS - REMOVE EMPTY STRINGS
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
      );

      return usersService.getAll(cleanParams);
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
      search: '',
      role: undefined,
      fromDate: '',
      toDate: '',
    });

  return {
    // Stats Data
    stats: stats?.data,
    isStatsLoading,

    // Users Data
    users: data?.data.data || [],
    meta: data?.data?.meta,
    isLoading,
    isError,

    // Filters
    filters,
    setFilter,
    clearFilters,

    // Refetch
    refetch: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  };
};
