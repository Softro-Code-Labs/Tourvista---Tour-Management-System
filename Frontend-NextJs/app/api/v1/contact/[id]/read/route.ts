import { NextRequest, NextResponse } from 'next/server';
import { authApi } from '@/lib/api/client';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await req.json();

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { success: false, message: 'Invalid ID' },
      { status: 400 },
    );
  }

  return authApi.patch(`/contact/${id}/read`, body);
}
