import { PaymentResponse } from '../types/payments.type';

const BASE_URL = '/api/v1/payments';

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

export const paymentService = {
  getStats: () => apiRequest(`${BASE_URL}/stats`),

  getAll: (params: Record<string, any> = {}): Promise<PaymentResponse> =>
    apiRequest(`${BASE_URL}/admin?${new URLSearchParams(params)}`),
};
