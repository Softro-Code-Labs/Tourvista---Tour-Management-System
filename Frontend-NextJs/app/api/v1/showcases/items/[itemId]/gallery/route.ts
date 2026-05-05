import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ itemId: string }> };

/**
 * POST: Create a new showcases item gallery image
 * Admin only
 */
export async function POST(_req: NextRequest, context: RouteContext) {
  const { itemId } = await context.params;
  const formData = await _req.formData();
  return await authApi.post(`/showcases/items/${itemId}/gallery`, formData);
}

/**
 * GET: Fetch all showcases item gallery images
 * Admin access
 */
export async function GET(_req: NextRequest, context: RouteContext) {
  const { itemId } = await context.params;
  return await authApi.get(`/showcases/items/${itemId}/gallery`);
}
