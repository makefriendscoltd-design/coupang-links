import { createClient } from '@supabase/supabase-js';

// 서버 컴포넌트/API용 (service key → RLS 우회, 쓰기 가능)
export function getSupabaseAdmin() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );
}
