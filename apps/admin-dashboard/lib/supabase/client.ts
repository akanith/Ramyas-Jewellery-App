// ============================================================
// Supabase Client Initialization (Direct Live Connection)
// ============================================================

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://icsqnkqwvlrgtncmtmqv.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_6u227x1Q3s7Pbd1wsKTUEg_pMJl_CUt";

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL) && Boolean(SUPABASE_ANON_KEY);
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Returns the initialized live Supabase client.
 */
export async function getSupabaseClient() {
  return supabase;
}
