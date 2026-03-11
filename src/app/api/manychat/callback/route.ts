import { NextRequest, NextResponse } from 'next/server';

// POST /api/manychat/callback
export async function POST(req: NextRequest) {
  const body = await req.json();
  const subscriberId = body.id || body.subscriber_id || '';
  const igUsername = body.ig_username || body.username || '';

  console.log(`[ManyChat] callback: @${igUsername || subscriberId}`);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mydomain.com';
  const linksUrl = `${baseUrl}/links/insta`;

  return NextResponse.json({
    dm_message: `추천 제품 구매 링크 보내드립니다\n${linksUrl}`,
    links_url: linksUrl,
    button_text: '추천 제품 보기',
  });
}
