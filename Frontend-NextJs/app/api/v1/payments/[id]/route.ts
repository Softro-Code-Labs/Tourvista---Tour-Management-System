import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * PATCH: Update payment details
 * Authenticated users only (travelers)
 */
export async function PATCH(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  return await authApi.patch(`/payments/${id}`);
}
