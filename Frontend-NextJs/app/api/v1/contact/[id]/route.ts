import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * DELETE: Delete a message from contact list
 *  Admin only
 */
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return authApi.delete(`/contact/${id}`);
}
