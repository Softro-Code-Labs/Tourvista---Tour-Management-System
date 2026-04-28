import { authApi } from '@/lib/api/client';
import { NextRequest } from 'next/server';

/**
 * POST: Create a new booking with form data
 * Authenticated users only (travelers)
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  return await authApi.post('/bookings', body);
}
