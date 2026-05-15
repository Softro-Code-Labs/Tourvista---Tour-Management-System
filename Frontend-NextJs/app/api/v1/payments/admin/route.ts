import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

/**
 * GET: Get all payments
 *  Admin only
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return await authApi.get(`/payments/admin?${searchParams.toString()}`);
}
