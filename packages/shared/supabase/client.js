import { createClient } from "@supabase/supabase-js";

/**
 * Create a Supabase browser client.
 * Both apps (website and cms) call this with their own env vars.
 * Never use the service-role key here — only the publishable (anon) key.
 */
export function createSupabaseClient(supabaseUrl, supabaseAnonKey) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Missing Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file."
    );
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}
