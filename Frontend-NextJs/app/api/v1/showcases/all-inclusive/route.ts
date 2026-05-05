import { NextRequest } from 'next/server';
import { publicApi } from '@/lib/api/client';

/**
 * GET: Fetch all showcases with filters
 * Public access
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return await publicApi.get(
    `/showcases/all-inclusive?${searchParams.toString()}`,
  );
}
