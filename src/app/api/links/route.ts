import { NextRequest, NextResponse } from 'next/server';
import { getAllLinks, addLink, upsertLinkByProject } from '@/lib/links';

function authorize(req: NextRequest): boolean {
  const key = req.headers.get('x-api-key') || req.nextUrl.searchParams.get('key');
  return key === process.env.API_SECRET;
}

// GET /api/links — 전체 목록
export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await getAllLinks();
  return NextResponse.json({ success: true, data });
}

// POST /api/links — 추가 또는 upsert
export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  // project_id가 있으면 upsert, 없으면 수동 추가
  if (body.project_id) {
    const entry = await upsertLinkByProject(body);
    return NextResponse.json({ success: true, data: entry });
  }

  const entry = await addLink(body);
  return NextResponse.json({ success: true, data: entry }, { status: 201 });
}
