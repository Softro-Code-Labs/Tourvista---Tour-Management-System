import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * PATCH: Refund a payment
 *  Authenticated users only (travelers)
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await req.json();
  return await authApi.patch(`/payments/${id}/refund`, body);
}
