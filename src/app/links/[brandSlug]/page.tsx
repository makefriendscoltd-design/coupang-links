import { Metadata } from 'next';
import { getLinksByBrand } from '@/lib/links';
import { LinksPage } from './LinksPage';

interface Props {
  params: Promise<{ brandSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug } = await params;
  return {
    title: `@${brandSlug} — 추천 제품`,
    description: '엄선된 추천 제품을 최저가로 만나보세요',
    openGraph: {
      title: `@${brandSlug} 추천 제품`,
      description: '엄선된 추천 제품을 최저가로 만나보세요',
    },
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({ params }: Props) {
  const { brandSlug } = await params;
  const links = await getLinksByBrand(brandSlug);
  return <LinksPage brandSlug={brandSlug} links={links} />;
}
