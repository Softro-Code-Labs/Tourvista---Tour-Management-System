import { NextRequest } from 'next/server';
import { authApi, publicApi } from '@/lib/api/client';

/**
 * GET: Fetch all tours with filters
 * Public access
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return await publicApi.get(`/tours?${searchParams.toString()}`);
}

/**
 * POST: Create a new tour with image upload
 * Admin only
 */
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  return await authApi.post('/tours', formData);
}
