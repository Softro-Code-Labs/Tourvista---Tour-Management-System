import { NextRequest, NextResponse } from 'next/server';
import { SERVER_ENV } from '@/lib/env.server';
import { auth } from '@clerk/nextjs/server';
import { logger } from '@/lib/logger';

const BASE_URL = SERVER_ENV.BACKEND_URL;

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const id = Number(params.id);

    if (!id || isNaN(id)) {
      logger.error('DELETE contact error: Invalid ID');
      return NextResponse.json(
        { success: false, message: 'Invalid ID' },
        { status: 400 },
      );
    }

    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      logger.error('DELETE contact error: Unauthorized');
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const res = await fetch(`${BASE_URL}/api/v1/contact/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      logger.error('DELETE contact error:', data);
      return NextResponse.json(
        {
          success: false,
          message: data?.message || 'Failed to delete contact',
        },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    logger.error('DELETE /contact crash:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
