import { auth } from '@clerk/nextjs/server';
import { SERVER_ENV } from '@/config/env.server';
import { NextResponse } from 'next/server';
import { logger } from '@/core/logger';

const BASE_URL = `${SERVER_ENV.BACKEND_URL}/api/v1`;

export async function createRequest(
  endpoint: string,
  options: RequestInit = {},
  requireAuth: boolean = true,
) {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (requireAuth) {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      logger.error(`Unauthorized request attempt to ${endpoint}`);
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      logger.error(
        `Request failed for ${endpoint} - ${res.status} ${res.statusText}`,
      );
      return NextResponse.json(
        { success: false, message: data?.message || 'Request failed' },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    logger.error(`Internal server error for ${endpoint}: ${error}`);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
