import { NextRequest, NextResponse } from 'next/server';
import { authApi } from '@/lib/api/client';

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { success: false, message: 'Invalid ID' },
      { status: 400 },
    );
  }

  return authApi.delete(`/contact/${id}`);
}
