import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

/**
 * POST: Create a new attraction category
 * Admin only
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  return await authApi.post('/attractions', body);
}

/**
 * GET: Fetch all attraction categories with filters
 * Admin access
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return await authApi.get(`/attractions?${searchParams.toString()}`);
}
