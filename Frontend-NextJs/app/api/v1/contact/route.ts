import { SERVER_ENV } from '@/lib/env.server';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { logger } from '@/lib/logger';
import { success } from 'zod';

const BASE_URL = SERVER_ENV.BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${BASE_URL}/api/v1/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      logger.error('POST contact error:', data);
      return NextResponse.json(
        {
          success: false,
          message: data?.message || 'Failed to send message',
        },
        { status: res.status },
      );
    }

    logger.info('POST contact message sent:', data);
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data,
    });
  } catch (err) {
    logger.error('POST contact crash:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      logger.error('GET contact error: Unauthorized');
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.toString();

    const res = await fetch(`${BASE_URL}/api/v1/contact?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      logger.error('GET contact error:', data);
      return NextResponse.json(
        {
          success: false,
          message: data?.message || 'Failed to fetch contacts',
        },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    logger.error('GET contact crash:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
