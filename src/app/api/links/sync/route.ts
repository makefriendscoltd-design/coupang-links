import { NextRequest, NextResponse } from 'next/server';
import { upsertLinkByProject } from '@/lib/links';

function authorize(req: NextRequest): boolean {
  const key = req.headers.get('x-api-key');
  return key === process.env.API_SECRET;
}

// POST /api/links/sync — 로컬 서버에서 일괄 동기화 (backfill 대체)
// Body: { links: [{ project_id, title, image_url, ... }, ...] }
export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { links } = await req.json();
  if (!Array.isArray(links)) {
    return NextResponse.json({ error: 'links 배열 필요' }, { status: 400 });
  }

  let upserted = 0, failed = 0;

  for (const link of links) {
    if (!link.project_id || !link.coupang_url) continue;
    try {
      await upsertLinkByProject(link);
      upserted++;
    } catch {
      failed++;
    }
  }

  return NextResponse.json({
    success: true,
    result: { processed: links.length, upserted, failed },
  });
}
