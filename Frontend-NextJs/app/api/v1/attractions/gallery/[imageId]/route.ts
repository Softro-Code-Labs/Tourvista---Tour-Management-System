import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ imageId: string }> };

/**
 * DELETE: Remove a attraction item gallery image
 * Admin access
 */
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { imageId } = await context.params;
  return await authApi.delete(`/attractions/gallery/${imageId}`);
}
