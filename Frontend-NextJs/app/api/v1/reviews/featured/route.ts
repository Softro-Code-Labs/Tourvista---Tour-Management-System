import { NextRequest } from 'next/server';
import { publicApi } from '@/lib/api/client';

/**
 * GET: Fetch all featured reviews with filters
 * Public access
 */
export async function GET(_req: NextRequest) {
  return await publicApi.get(`/reviews/featured`);
}
