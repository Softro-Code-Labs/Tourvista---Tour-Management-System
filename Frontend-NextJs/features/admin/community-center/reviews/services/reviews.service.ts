import { ReviewResponse } from '../types/reviews.type';

const BASE_URL = '/api/v1/reviews';

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

export const reviewsService = {
  getStats: () => apiRequest(`${BASE_URL}/stats`),

  getAll: (params: Record<string, any> = {}): Promise<ReviewResponse> => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`${BASE_URL}?${query}`);
  },

  updateVisibility: (id: number, isVisible: boolean) =>
    apiRequest(`${BASE_URL}/${id}/visibility`, {
      method: 'PATCH',
      body: JSON.stringify({ isVisible }),
    }),

  updateFeatured: (id: number, isFeatured: boolean) =>
    apiRequest(`${BASE_URL}/${id}/featured`, {
      method: 'PATCH',
      body: JSON.stringify({ isFeatured }),
    }),

  delete: (id: number) => apiRequest(`${BASE_URL}/${id}`, { method: 'DELETE' }),
};
