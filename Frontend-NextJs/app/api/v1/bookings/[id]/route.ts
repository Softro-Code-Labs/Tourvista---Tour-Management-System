import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * DELETE: Remove a booking
 * PENDING Booking only
 */
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return await authApi.delete(`/bookings/${id}`);
}
