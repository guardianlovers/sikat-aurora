-- =============================================================================
-- Síkat-Aurora CMS — Initial Database Migration
-- =============================================================================
-- Creates all tables, enums, functions, triggers, and RLS policies required
-- for the CMS and public website.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Custom types
-- ---------------------------------------------------------------------------

CREATE TYPE public.user_role AS ENUM ('writer', 'editor', 'admin');
CREATE TYPE public.post_status AS ENUM ('draft', 'in_review', 'scheduled', 'published', 'archived');

-- ---------------------------------------------------------------------------
-- 2. Tables
-- ---------------------------------------------------------------------------

-- Profiles — linked to auth.users via id
CREATE TABLE public.profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   text NOT NULL DEFAULT '',
  role        public.user_role NOT NULL DEFAULT 'writer',
  avatar_url  text,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Categories
CREATE TABLE public.categories (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL UNIQUE,
  slug        text NOT NULL UNIQUE,
  description text,
  color       text DEFAULT '#1D4A6F',
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Posts
CREATE TABLE public.posts (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text NOT NULL DEFAULT '',
  slug             text NOT NULL UNIQUE,
  excerpt          text,
  body_json        jsonb,
  cover_image_path text,
  cover_image_alt  text,
  category_id      uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id        uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status           public.post_status NOT NULL DEFAULT 'draft',
  is_featured      boolean NOT NULL DEFAULT false,
  published_at     timestamptz,
  scheduled_at     timestamptz,
  seo_title        text,
  seo_description  text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  deleted_at       timestamptz
);

CREATE INDEX idx_posts_status      ON public.posts (status);
CREATE INDEX idx_posts_author      ON public.posts (author_id);
CREATE INDEX idx_posts_category    ON public.posts (category_id);
CREATE INDEX idx_posts_published   ON public.posts (published_at DESC NULLS LAST);
CREATE INDEX idx_posts_slug        ON public.posts (slug);

-- Media
CREATE TABLE public.media (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL UNIQUE,
  file_name    text NOT NULL,
  mime_type    text NOT NULL,
  file_size    integer NOT NULL DEFAULT 0,
  width        integer,
  height       integer,
  alt_text     text,
  caption      text,
  uploaded_by  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 3. Helper functions
-- ---------------------------------------------------------------------------

-- Get the current user's role from the profiles table (not from JWT metadata).
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS public.user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles
  WHERE id = auth.uid() AND is_active = true;
$$;

-- Auto-update the updated_at timestamp on row modification.
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Ensure only one published post is featured at a time.
-- When a post is set to is_featured = true AND status = 'published',
-- all other published featured posts are un-featured.
CREATE OR REPLACE FUNCTION public.enforce_single_featured()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.is_featured = true AND NEW.status = 'published' THEN
    UPDATE public.posts
    SET is_featured = false, updated_at = now()
    WHERE id != NEW.id
      AND is_featured = true
      AND status = 'published';
  END IF;
  RETURN NEW;
END;
$$;

-- Auto-create a profile row when a new user signs up via auth.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::public.user_role, 'writer')
  );
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- 4. Triggers
-- ---------------------------------------------------------------------------

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER enforce_single_featured_post
  BEFORE INSERT OR UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.enforce_single_featured();

-- Create profile automatically on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 5. Row Level Security — Enable on all tables
-- ---------------------------------------------------------------------------

ALTER TABLE public.profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media     ENABLE ROW LEVEL SECURITY;

-- ======================== PROFILES ========================

-- Public: no access to profiles.
-- Authenticated users can read active profiles (for author display).
CREATE POLICY "Authenticated users can view active profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Users can update their own profile (name, avatar), but NOT their role.
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- Only admins can insert new profiles (handled by trigger, but policy needed).
CREATE POLICY "Admins can insert profiles"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (public.get_user_role() = 'admin');

-- Only admins can manage (update) other profiles.
CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (public.get_user_role() = 'admin')
  WITH CHECK (public.get_user_role() = 'admin');

-- ======================== CATEGORIES ========================

-- Public: anyone can read active categories.
CREATE POLICY "Anyone can view active categories"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Only admins can insert categories.
CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT
  TO authenticated
  WITH CHECK (public.get_user_role() = 'admin');

-- Only admins can update categories.
CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE
  TO authenticated
  USING (public.get_user_role() = 'admin')
  WITH CHECK (public.get_user_role() = 'admin');

-- Only admins can delete categories.
CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  TO authenticated
  USING (public.get_user_role() = 'admin');

-- ======================== POSTS ========================

-- Public: read only published posts that are not soft-deleted and not future-dated.
CREATE POLICY "Public can view published posts"
  ON public.posts FOR SELECT
  TO anon
  USING (
    status = 'published'
    AND deleted_at IS NULL
    AND (published_at IS NULL OR published_at <= now())
  );

-- Writers: can view their own posts (any status).
CREATE POLICY "Writers can view own posts"
  ON public.posts FOR SELECT
  TO authenticated
  USING (
    author_id = auth.uid()
    AND deleted_at IS NULL
  );

-- Editors and Admins: can view all non-deleted posts.
CREATE POLICY "Editors and admins can view all posts"
  ON public.posts FOR SELECT
  TO authenticated
  USING (
    public.get_user_role() IN ('editor', 'admin')
    AND deleted_at IS NULL
  );

-- Writers: can create drafts (their own, status must be draft).
CREATE POLICY "Writers can create drafts"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (
    author_id = auth.uid()
    AND status = 'draft'
  );

-- Editors/admins can create posts with any status.
CREATE POLICY "Editors and admins can create posts"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (
    public.get_user_role() IN ('editor', 'admin')
  );

-- Writers: can update their own drafts/in-review posts, but cannot set status
-- to published, scheduled, or archived.
CREATE POLICY "Writers can update own drafts"
  ON public.posts FOR UPDATE
  TO authenticated
  USING (
    author_id = auth.uid()
    AND status IN ('draft', 'in_review')
  )
  WITH CHECK (
    author_id = auth.uid()
    AND status IN ('draft', 'in_review')
  );

-- Editors: can update any post (publish, archive, return to draft).
CREATE POLICY "Editors can update any post"
  ON public.posts FOR UPDATE
  TO authenticated
  USING (public.get_user_role() IN ('editor', 'admin'))
  WITH CHECK (public.get_user_role() IN ('editor', 'admin'));

-- Admins: can soft-delete (set deleted_at) on any post.
CREATE POLICY "Admins can delete posts"
  ON public.posts FOR DELETE
  TO authenticated
  USING (public.get_user_role() = 'admin');

-- ======================== MEDIA ========================

-- Public: can view media referenced in published posts.
-- Simplified: authenticated can see all, anon can see all (images are in Storage with their own policies).
CREATE POLICY "Anyone can view media metadata"
  ON public.media FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users (any CMS role) can insert media.
CREATE POLICY "CMS users can upload media"
  ON public.media FOR INSERT
  TO authenticated
  WITH CHECK (
    uploaded_by = auth.uid()
    AND public.get_user_role() IS NOT NULL
  );

-- Users can update their own media (alt text, caption).
CREATE POLICY "Users can update own media"
  ON public.media FOR UPDATE
  TO authenticated
  USING (uploaded_by = auth.uid())
  WITH CHECK (uploaded_by = auth.uid());

-- Editors/admins can update any media.
CREATE POLICY "Editors and admins can update any media"
  ON public.media FOR UPDATE
  TO authenticated
  USING (public.get_user_role() IN ('editor', 'admin'))
  WITH CHECK (public.get_user_role() IN ('editor', 'admin'));

-- Admins can delete media.
CREATE POLICY "Admins can delete media"
  ON public.media FOR DELETE
  TO authenticated
  USING (public.get_user_role() = 'admin');

-- ---------------------------------------------------------------------------
-- 6. Storage bucket and policies
-- ---------------------------------------------------------------------------

-- Create the blog-media storage bucket (public read).
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-media',
  'blog-media',
  true,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Anyone can read from blog-media (public bucket).
CREATE POLICY "Public read for blog-media"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog-media');

-- Authenticated CMS users can upload to blog-media.
CREATE POLICY "CMS users can upload to blog-media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'blog-media'
    AND public.get_user_role() IS NOT NULL
  );

-- Users can update their own uploads.
CREATE POLICY "Users can update own uploads in blog-media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'blog-media'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (bucket_id = 'blog-media');

-- Admins can delete from blog-media.
CREATE POLICY "Admins can delete from blog-media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'blog-media'
    AND public.get_user_role() = 'admin'
  );
