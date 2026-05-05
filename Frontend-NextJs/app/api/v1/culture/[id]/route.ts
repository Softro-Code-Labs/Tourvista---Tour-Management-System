import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * PATCH: Update culture category details
 * Admin only
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await req.json();

  return await authApi.patch(`/culture/${id}`, body);
}

/**
 * DELETE: Remove a culture category
 * Admin only
 */
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return await authApi.delete(`/culture/${id}`);
}
