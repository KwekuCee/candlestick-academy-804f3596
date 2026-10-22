import { supabase as connectedSupabase } from '@/integrations/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// Share the integration's session, opaque-key handling, and preview storage.
export const supabase: SupabaseClient | null = isSupabaseConfigured ? connectedSupabase : null;
