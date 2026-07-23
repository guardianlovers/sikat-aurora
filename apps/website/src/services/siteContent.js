import { supabase } from "./supabase";

const isSupabaseConfigured = Boolean(
  supabase && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

/**
 * Fetch dynamic team members from Supabase, or null if unconfigured/empty.
 */
export async function fetchTeamMembers() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("is_active", true)
      .order("tier", { ascending: true })
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return null;
    return data;
  } catch (err) {
    console.warn("Failed to fetch dynamic team members:", err);
    return null;
  }
}

/**
 * Fetch dynamic awards list from Supabase, or null if unconfigured/empty.
 */
export async function fetchAwards() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from("awards")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return null;
    return data;
  } catch (err) {
    console.warn("Failed to fetch dynamic awards:", err);
    return null;
  }
}

/**
 * Fetch dynamic impact gallery photos (max 12) from Supabase.
 */
export async function fetchImpactGallery() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .eq("caption", "impact-gallery")
      .order("created_at", { ascending: false })
      .limit(12);

    if (error || !data || data.length === 0) return null;
    return data;
  } catch (err) {
    console.warn("Failed to fetch dynamic impact gallery:", err);
    return null;
  }
}
