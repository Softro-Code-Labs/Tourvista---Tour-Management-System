import { ReviewFormData } from '../schemas/reviews.schema';
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
  getAll: (): Promise<ReviewResponse> => apiRequest(`${BASE_URL}/featured`),

  post: (body: ReviewFormData) =>
    apiRequest(`${BASE_URL}`, { method: 'POST', body: JSON.stringify(body) }),
};
