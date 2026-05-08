import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';
/**
 * GET: Fetch all bookings with filters
 * Autherzied users only (travelers)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return await authApi.get(`/bookings/user?${searchParams.toString()}`);
}
