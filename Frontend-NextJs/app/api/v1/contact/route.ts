import { NextRequest } from 'next/server';
import { authApi, publicApi } from '@/lib/api/client';

/**
 * POST: Create a new message
 * Public access
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  return publicApi.post('/contact', body);
}

/**
 * GET: Fetch all messages with filters
 * Admin only
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return authApi.get(`/contact?${searchParams.toString()}`);
}
