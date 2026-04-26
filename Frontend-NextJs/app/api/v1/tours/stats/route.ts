import { authApi } from '@/lib/api/client';

/**
 * GET: Fetch tour statistics
 * Admin only
 */
export async function GET() {
  return await authApi.get(`/tours/stats`);
}
