-- =============================================================================
-- Síkat-Aurora CMS — Development Seed Data
-- =============================================================================
-- This file seeds development/staging environments with sample data.
-- DO NOT run this in production without reviewing the content.
-- All posts are created as 'draft' so they won't appear publicly.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Categories (matching the existing Síkat-Aurora program structure)
-- ---------------------------------------------------------------------------

INSERT INTO public.categories (id, name, slug, description, color, is_active) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Abot Ko Ang Libro', 'abot-ko-ang-libro',
   'Stories from our mobile library cart program serving kids ages 2-14.', '#EC670A', true),
  ('a1000000-0000-0000-0000-000000000002', 'Ang Batang Kali', 'ang-batang-kali',
   'Environmental life skills program for youth ages 8-15.', '#006B1E', true),
  ('a1000000-0000-0000-0000-000000000003', 'Hiraya', 'hiraya',
   'Leadership training and seed funding for aspiring youth leaders.', '#1D4A6F', true),
  ('a1000000-0000-0000-0000-000000000004', 'Updates', 'updates',
   'Organization news, announcements, and transparency reports.', '#FBC21B', true)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Sample posts (all DRAFT — these are placeholder content)
-- ---------------------------------------------------------------------------
-- NOTE: These require an author_id that references a real profile.
-- Run after creating at least one admin user through Supabase Auth.
-- The author_id below is a placeholder UUID that should be replaced
-- with the actual admin user's ID after setup.
--
-- To seed posts after creating your first admin user:
--   1. Create the admin via Supabase Dashboard > Authentication > Users
--   2. Copy the user's UUID
--   3. Replace 'REPLACE_WITH_ADMIN_UUID' below with that UUID
--   4. Run this seed file
-- ---------------------------------------------------------------------------

-- UNCOMMENT AND REPLACE the UUID below after creating your admin user:
--
-- INSERT INTO public.posts (title, slug, excerpt, category_id, author_id, status, is_featured) VALUES
--   ('Field Notes — Five Saturdays in Brgy. Zabali',
--    'five-saturdays-in-zabali',
--    'What happens when a library on wheels meets fifty kids who have never borrowed a book before.',
--    'a1000000-0000-0000-0000-000000000001',
--    'REPLACE_WITH_ADMIN_UUID',
--    'draft', false),
--   ('The Cart That Started It All',
--    'the-cart-that-started-it',
--    'How a repurposed pushcart, two crates of donated storybooks, and a handful of volunteers became our longest-running program.',
--    'a1000000-0000-0000-0000-000000000001',
--    'REPLACE_WITH_ADMIN_UUID',
--    'draft', false),
--   ('From Dibut to Cozo: Batang Kali by the Water',
--    'dibut-to-cozo',
--    'How a river cleanup turned into a lifelong promise between a group of kids and their coastline.',
--    'a1000000-0000-0000-0000-000000000002',
--    'REPLACE_WITH_ADMIN_UUID',
--    'draft', false),
--   ('Hiraya 2026: Thirty Schools, One Generation of Leaders',
--    'hiraya-2026-thirty-schools',
--    'Inside the leadership training that hands young people both the microphone and the funding to use it.',
--    'a1000000-0000-0000-0000-000000000003',
--    'REPLACE_WITH_ADMIN_UUID',
--    'draft', false),
--   ('How We Publish Every Peso',
--    'how-we-publish-our-finances',
--    'A walkthrough of our public financial tracker — what we record, how often, and why transparency is a program decision.',
--    'a1000000-0000-0000-0000-000000000004',
--    'REPLACE_WITH_ADMIN_UUID',
--    'draft', false);
