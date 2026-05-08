import { NextRequest } from 'next/server';
import { publicApi } from '@/lib/api/client';

/**
 * GET: Fetch all attractions with filters
 * Public access
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return await publicApi.get(
    `/attractions/all-inclusive?${searchParams.toString()}`,
  );
}
