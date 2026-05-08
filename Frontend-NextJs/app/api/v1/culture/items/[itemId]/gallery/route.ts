import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ itemId: string }> };

/**
 * POST: Create a new culture item gallery image
 * Admin only
 */
export async function POST(_req: NextRequest, context: RouteContext) {
  const { itemId } = await context.params;
  const formData = await _req.formData();
  return await authApi.post(`/culture/items/${itemId}/gallery`, formData);
}

/**
 * GET: Fetch all culture item gallery images
 * Admin access
 */
export async function GET(_req: NextRequest, context: RouteContext) {
  const { itemId } = await context.params;
  return await authApi.get(`/culture/items/${itemId}/gallery`);
}
