import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ itemId: string }> };

/**
 * POST: Create a new attraction item gallery image
 * Admin only
 */
export async function POST(_req: NextRequest, context: RouteContext) {
  const { itemId } = await context.params;
  const formData = await _req.formData();
  return await authApi.post(`/attractions/items/${itemId}/gallery`, formData);
}

/**
 * GET: Fetch all attraction item gallery images
 * Admin access
 */
export async function GET(_req: NextRequest, context: RouteContext) {
  const { itemId } = await context.params;
  return await authApi.get(`/attractions/items/${itemId}/gallery`);
}
