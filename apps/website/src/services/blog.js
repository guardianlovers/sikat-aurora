/**
 * Blog data services — fetches posts and categories from Supabase.
 *
 * When Supabase is not configured (env vars missing), falls back to
 * the hard-coded POSTS array in lib/posts.js so the site still works
 * during development without a database.
 */
import { supabase } from "./supabase";
import { POSTS, POST_CATEGORIES, getPostBody, getPostAuthor, getRelatedPosts, formatPostDate } from "@/lib/posts";

const isSupabaseConfigured =
  Boolean(supabase && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

// ─── Categories ────────────────────────────────────────────────────

export async function fetchCategories() {
  if (!isSupabaseConfigured) {
    return POST_CATEGORIES.filter((c) => c !== "All").map((name, i) => ({
      id: `local-${i}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      color: "#1D4A6F",
    }));
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, color")
    .eq("is_active", true)
    .order("name");

  if (error) throw error;
  return data;
}

// ─── Posts list (published only) ───────────────────────────────────

export async function fetchPublishedPosts({ category, limit, offset = 0 } = {}) {
  if (!isSupabaseConfigured) {
    let posts = [...POSTS];
    if (category && category !== "All") {
      posts = posts.filter((p) => p.category === category);
    }
    posts.sort((a, b) => b.date.localeCompare(a.date));
    return {
      posts: posts.slice(offset, offset + (limit || posts.length)).map(localPostToPublic),
      total: posts.length,
    };
  }

  let query = supabase
    .from("posts")
    .select(`
      id, title, slug, excerpt, cover_image_path, cover_image_alt,
      category_id, author_id, status, is_featured, published_at,
      seo_title, seo_description, created_at,
      categories (id, name, slug, color),
      profiles:author_id (id, full_name, avatar_url)
    `, { count: "exact" })
    .eq("status", "published")
    .is("deleted_at", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (category) {
    query = query.eq("categories.slug", category);
  }
  if (limit) {
    query = query.range(offset, offset + limit - 1);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { posts: data || [], total: count || 0 };
}

// ─── Single post by slug ───────────────────────────────────────────

export async function fetchPostBySlug(slug) {
  if (!isSupabaseConfigured) {
    const post = POSTS.find((p) => p.slug === slug);
    if (!post) return null;
    return {
      ...localPostToPublic(post),
      body_json: getPostBody(post),
      author: getPostAuthor(post),
    };
  }

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id, title, slug, excerpt, body_json,
      cover_image_path, cover_image_alt,
      category_id, author_id, status, is_featured,
      published_at, seo_title, seo_description, created_at,
      categories (id, name, slug, color),
      profiles:author_id (id, full_name, avatar_url)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .is("deleted_at", null)
    .lte("published_at", new Date().toISOString())
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw error;
  }
  return data;
}

// ─── Featured post ─────────────────────────────────────────────────

export async function fetchFeaturedPost() {
  if (!isSupabaseConfigured) {
    const featured = POSTS.find((p) => p.featured);
    return featured ? localPostToPublic(featured) : null;
  }

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id, title, slug, excerpt, cover_image_path, cover_image_alt,
      category_id, author_id, status, is_featured, published_at,
      categories (id, name, slug, color),
      profiles:author_id (id, full_name, avatar_url)
    `)
    .eq("status", "published")
    .eq("is_featured", true)
    .is("deleted_at", null)
    .lte("published_at", new Date().toISOString())
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data;
}

// ─── Related posts ─────────────────────────────────────────────────

export async function fetchRelatedPosts(post, limit = 3) {
  if (!isSupabaseConfigured) {
    const localPost = POSTS.find((p) => p.slug === post.slug);
    return getRelatedPosts(localPost, limit).map(localPostToPublic);
  }

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id, title, slug, excerpt, cover_image_path, cover_image_alt,
      category_id, published_at,
      categories (id, name, slug, color)
    `)
    .eq("status", "published")
    .is("deleted_at", null)
    .neq("id", post.id)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit + 5); // fetch extra, then sort by category match

  if (error) throw error;

  // Prefer same category
  const sorted = (data || []).sort((a, b) => {
    const sameA = a.category_id === post.category_id ? 0 : 1;
    const sameB = b.category_id === post.category_id ? 0 : 1;
    return sameA - sameB;
  });

  return sorted.slice(0, limit);
}

// ─── Storage URL helper ────────────────────────────────────────────

export function getImageUrl(storagePath) {
  if (!storagePath) return null;
  // If it's already a full URL (local asset import), return as-is
  if (storagePath.startsWith("http") || storagePath.startsWith("/") || storagePath.startsWith("data:")) {
    return storagePath;
  }
  if (!isSupabaseConfigured) return storagePath;

  const { data } = supabase.storage.from("blog-media").getPublicUrl(storagePath);
  return data?.publicUrl || storagePath;
}

// ─── Helpers ───────────────────────────────────────────────────────

/** Map a local hard-coded post object to the shape returned by Supabase queries. */
function localPostToPublic(post) {
  return {
    id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    cover_image_path: post.img,
    cover_image_alt: post.title,
    is_featured: post.featured || false,
    published_at: post.date,
    read_time: post.readTime,
    categories: {
      id: `local-cat`,
      name: post.category,
      slug: post.category.toLowerCase().replace(/\s+/g, "-"),
      color: "#1D4A6F",
    },
    profiles: getPostAuthor(post),
  };
}

// Re-export formatPostDate for convenience
export { formatPostDate };
