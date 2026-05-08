import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * PATCH: Update booking details
 * Authenticated users only (travelers)
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const formData = await req.json();

  return await authApi.patch(`/bookings/${id}/user`, formData);
}
