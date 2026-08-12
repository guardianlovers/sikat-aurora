/**
 * JSDoc type definitions for the Síkat-Aurora Supabase schema.
 * These serve as documentation and IDE hints since the project uses plain JS.
 */

/**
 * @typedef {Object} Profile
 * @property {string} id - UUID, references auth.users
 * @property {string} full_name
 * @property {'writer'|'editor'|'admin'} role
 * @property {string|null} avatar_url
 * @property {boolean} is_active
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Category
 * @property {string} id - UUID
 * @property {string} name
 * @property {string} slug
 * @property {string|null} description
 * @property {string|null} color - hex color for UI badges
 * @property {boolean} is_active
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Post
 * @property {string} id - UUID
 * @property {string} title
 * @property {string} slug
 * @property {string|null} excerpt
 * @property {Object|null} body_json - Tiptap JSON document
 * @property {string|null} cover_image_path - Supabase Storage path
 * @property {string|null} cover_image_alt
 * @property {string|null} category_id
 * @property {string} author_id - references profiles.id
 * @property {'draft'|'in_review'|'scheduled'|'published'|'archived'} status
 * @property {boolean} is_featured
 * @property {string|null} published_at
 * @property {string|null} scheduled_at
 * @property {string|null} seo_title
 * @property {string|null} seo_description
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string|null} deleted_at
 */

/**
 * @typedef {Object} Media
 * @property {string} id - UUID
 * @property {string} storage_path
 * @property {string} file_name
 * @property {string} mime_type
 * @property {number} file_size
 * @property {number|null} width
 * @property {number|null} height
 * @property {string|null} alt_text
 * @property {string|null} caption
 * @property {string} uploaded_by - references profiles.id
 * @property {string} created_at
 */

// Re-export for convenience
export const Types = {};
