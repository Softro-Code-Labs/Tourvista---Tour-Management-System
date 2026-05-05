import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ itemId: string }> };

/**
 * PATCH: Update culture category details
 * Admin only
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const { itemId } = await context.params;
  const formData = await req.formData();
  return await authApi.patch(`/culture/items/${itemId}`, formData);
}

/**
 * DELETE: Remove a culture category
 * Admin only
 */
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { itemId } = await context.params;
  return await authApi.delete(`/culture/items/${itemId}`);
}
