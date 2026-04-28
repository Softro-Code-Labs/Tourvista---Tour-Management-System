import { NextRequest } from 'next/server';
import { authApi, publicApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET: Fetch a single tour
 * Public access
 */
export async function GET(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return await publicApi.get(`/tours/${id}`);
}

/**
 * PATCH: Update tour details and/or image
 * Admin only
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const formData = await req.formData();

  return await authApi.patch(`/tours/${id}`, formData);
}

/**
 * DELETE: Remove a tour
 * Admin only
 */
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return await authApi.delete(`/tours/${id}`);
}
