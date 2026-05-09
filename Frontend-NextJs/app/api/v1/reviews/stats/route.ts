import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

/**
 * GET: Fetch all reviews statistics
 * Admin only
 */
export async function GET(_req: NextRequest) {
  return await authApi.get(`/reviews/stats`);
}
