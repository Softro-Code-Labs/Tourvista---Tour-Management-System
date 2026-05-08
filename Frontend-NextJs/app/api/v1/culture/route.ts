import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

/**
 * POST: Create a new culture category
 * Admin only
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  return await authApi.post('/culture', body);
}

/**
 * GET: Fetch all culture categories with filters
 * Admin access
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return await authApi.get(`/culture?${searchParams.toString()}`);
}
