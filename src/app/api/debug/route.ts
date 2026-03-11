import { NextRequest, NextResponse } from 'next/server';

// 임시 디버그 — 환경변수 확인 후 삭제할 것
export async function GET(req: NextRequest) {
  const apiSecret = process.env.API_SECRET;
  const headerKey = req.headers.get('x-api-key');
  return NextResponse.json({
    hasApiSecret: !!apiSecret,
    apiSecretLength: apiSecret?.length ?? 0,
    apiSecretPrefix: apiSecret?.slice(0, 6) ?? 'EMPTY',
    headerKey: headerKey?.slice(0, 6) ?? 'NONE',
    match: headerKey === apiSecret,
  });
}
