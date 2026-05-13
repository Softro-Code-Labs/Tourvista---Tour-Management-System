import { UserResponse } from '../types/users.type';

const BASE_URL = '/api/v1/users';

async function apiRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Unauthorized Action');
    (error as any).response = { data };
    throw error;
  }

  return data;
}

export const usersService = {
  getStats: () => apiRequest(`${BASE_URL}/stats`),

  getAll: (params: Record<string, any> = {}): Promise<UserResponse> => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`${BASE_URL}?${query}`);
  },
};
