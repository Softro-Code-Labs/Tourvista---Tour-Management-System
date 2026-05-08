import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';
/**
 * GET: Fetch all bookings with filters
 * Admin only
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return await authApi.get(`/bookings/admin?${searchParams.toString()}`);
}
