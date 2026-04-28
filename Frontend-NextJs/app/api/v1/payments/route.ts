import { NextRequest } from 'next/server';
import { authApi } from '@/lib/api/client';

export async function POST(req: NextRequest) {
  const body = await req.json();
  return await authApi.post('/payments', body);
}
