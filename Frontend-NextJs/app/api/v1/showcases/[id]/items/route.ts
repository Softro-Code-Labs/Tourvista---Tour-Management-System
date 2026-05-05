import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST: Create a new showcases item
 * Admin only
 */
export async function POST(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const formData = await req.formData();
  return await authApi.post(`/showcases/${id}/items`, formData);
}

/**
 * GET: Fetch all showcases items
 * Admin only
 */
export async function GET(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return await authApi.get(`/showcases/${id}/items`);
}
