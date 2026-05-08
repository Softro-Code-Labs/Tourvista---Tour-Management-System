import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST: Create a new attraction item
 * Admin only
 */
export async function POST(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const formData = await req.formData();
  return await authApi.post(`/attractions/${id}/items`, formData);
}

/**
 * GET: Fetch all attraction items
 * Admin only
 */
export async function GET(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return await authApi.get(`/attractions/${id}/items`);
}
