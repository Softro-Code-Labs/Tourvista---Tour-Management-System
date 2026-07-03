import { DashboardMetricsResponse } from '../types/analytics.type';

const BASE_URL = '/api/v1/analytics';

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

export const analyticsService = {
  getMetrics: (): Promise<DashboardMetricsResponse> =>
    apiRequest(`${BASE_URL}/metrics`),
};
