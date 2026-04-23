import { NextRequest } from 'next/server';
import { authApi, publicApi } from '@/lib/api/client';

// Public: Anyone can send a message
export async function POST(req: NextRequest) {
  const body = await req.json();
  return publicApi.post('/contact', body);
}

// Protected: Only Admin can see the messages
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return authApi.get(`/contact?${searchParams.toString()}`);
}
