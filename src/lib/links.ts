import { getSupabaseAdmin } from './supabase';

export interface LinkEntry {
  id: number;
  project_id: string | null;
  brand_slug: string;
  title: string;
  image_url: string;
  price_text: string;
  copy: string;
  coupang_url: string;
  created_at: string;
}

const DEFAULT_BRAND_SLUG = 'insta';

// ── 조회 ──

export async function getLinksByBrand(brandSlug: string): Promise<LinkEntry[]> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('links')
    .select('*')
    .eq('brand_slug', brandSlug || DEFAULT_BRAND_SLUG)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getAllLinks(): Promise<LinkEntry[]> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('links')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// ── 추가/수정 (Upsert by project_id) ──

interface UpsertPayload {
  project_id: string;
  brand_slug?: string;
  title: string;
  image_url?: string;
  price_text?: string;
  copy?: string;
  coupang_url: string;
}

export async function upsertLinkByProject(payload: UpsertPayload): Promise<LinkEntry> {
  const sb = getSupabaseAdmin();

  const row = {
    project_id: payload.project_id,
    brand_slug: payload.brand_slug || DEFAULT_BRAND_SLUG,
    title: payload.title || '',
    image_url: payload.image_url || '',
    price_text: payload.price_text || '',
    copy: payload.copy || '',
    coupang_url: payload.coupang_url || '',
  };

  const { data, error } = await sb
    .from('links')
    .upsert(row, { onConflict: 'project_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ── 수동 추가 ──

export async function addLink(entry: Partial<LinkEntry>): Promise<LinkEntry> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('links')
    .insert({
      project_id: entry.project_id || null,
      brand_slug: entry.brand_slug || DEFAULT_BRAND_SLUG,
      title: entry.title || '',
      image_url: entry.image_url || '',
      price_text: entry.price_text || '',
      copy: entry.copy || '',
      coupang_url: entry.coupang_url || '',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ── 삭제 ──

export async function removeLink(id: number): Promise<boolean> {
  const sb = getSupabaseAdmin();
  const { error } = await sb
    .from('links')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

export async function removeLinkByProjectId(projectId: string): Promise<boolean> {
  const sb = getSupabaseAdmin();
  const { error } = await sb
    .from('links')
    .delete()
    .eq('project_id', projectId);

  if (error) throw error;
  return true;
}
