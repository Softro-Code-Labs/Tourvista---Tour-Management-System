import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

/**
 * POST: Create a new review
 * Authenticated users only (travelers)
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  return await authApi.post('/reviews', body);
}

/**
 * GET: Fetch all reviews with filters
 * Authorized users only both (travelers and admins)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return await authApi.get(`/reviews?${searchParams.toString()}`);
}
