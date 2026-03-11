import { NextRequest, NextResponse } from 'next/server';
import { removeLink } from '@/lib/links';

function authorize(req: NextRequest): boolean {
  const key = req.headers.get('x-api-key') || req.nextUrl.searchParams.get('key');
  return key === process.env.API_SECRET;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await removeLink(Number(id));

  if (!deleted) {
    return NextResponse.json({ success: false, error: '링크를 찾을 수 없습니다.' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
