import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

/**
 * POST: Create a new showcases category
 * Admin only
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  return await authApi.post('/showcases', body);
}

/**
 * GET: Fetch all showcases categories with filters
 * Admin access
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return await authApi.get(`/showcases?${searchParams.toString()}`);
}
