import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ itemId: string }> };

/**
 * PATCH: Update showcases category details
 * Admin only
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const { itemId } = await context.params;
  const formData = await req.formData();
  return await authApi.patch(`/showcases/items/${itemId}`, formData);
}

/**
 * DELETE: Remove a showcases category
 * Admin only
 */
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { itemId } = await context.params;
  return await authApi.delete(`/showcases/items/${itemId}`);
}
