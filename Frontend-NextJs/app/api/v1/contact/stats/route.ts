import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

/**
 * GET: Fetch all messages statistics
 * Admin only
 */
export async function GET(_req: NextRequest) {
  return authApi.get(`/contact/stats`);
}
