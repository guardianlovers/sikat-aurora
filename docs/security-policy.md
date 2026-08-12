# Security Policy & Architecture

## Overview

The Síkat-Aurora platform enforces strict security separation between anonymous, read-only access to the **public-facing website** (`apps/website`) and authenticated, role-based access for content management, both against a single Supabase backend. There is currently no dedicated CMS frontend app in this repo — authenticated content management (posts, categories, media, users) happens directly through the Supabase Dashboard/SQL Editor until a CMS UI is built.

```
                  ┌──────────────────────┐
                  │   Supabase Backend   │
                  │ (Database + Storage) │
                  └──────────┬───────────┘
                             │
            ┌────────────────┴────────────────┐
            │                                 │
  [Anon key: READ ONLY]            [Anon key + Auth JWT]
            │                                 │
     ┌──────▼──────┐                   ┌──────▼──────┐
     │ Public Site │                   │ Authenticated│
     │ (Website)   │                   │ Content Mgmt │
     └─────────────┘                   └─────────────┘
```

---

## 1. Authentication & Access Control

- **No Public Sign-Ups**: Public user registration is disabled in Supabase Auth settings. Volunteer accounts are created exclusively by administrators via the Supabase Dashboard.
- **Session Management**: Authenticated tooling uses Supabase Auth with persistent JWT sessions, automatic token refresh, and URL-detected session handling.
- **Inactive Account Locks**: Accounts marked `is_active = false` in `public.profiles` are automatically blocked from content-management access by database RLS.

---

## 2. Role-Based Access Control (RBAC)

The system defines three strict roles:

| Capability | Writer | Editor | Admin | Public |
| :--- | :---: | :---: | :---: | :---: |
| Read Published Posts | ✅ | ✅ | ✅ | ✅ |
| Create Drafts | ✅ | ✅ | ✅ | ❌ |
| Edit Own Drafts / In-Review | ✅ | ✅ | ✅ | ❌ |
| Edit Any Post | ❌ | ✅ | ✅ | ❌ |
| Publish / Schedule / Archive Posts | ❌ | ✅ | ✅ | ❌ |
| Upload Media | ✅ | ✅ | ✅ | ❌ |
| Manage Categories | ❌ | ❌ | ✅ | ❌ |
| Manage Users & Roles | ❌ | ❌ | ✅ | ❌ |
| Soft-Delete Posts / Media | ❌ | ❌ | ✅ | ❌ |

---

## 3. Database Row Level Security (RLS)

RLS is enabled on **all** database tables (`profiles`, `categories`, `posts`, `media`).

### `posts` Table Policies
- **Public**: `SELECT` where `status = 'published'`, `deleted_at IS NULL`, and `published_at <= now()`.
- **Writers**: `SELECT` and `UPDATE` on posts where `author_id = auth.uid()` and `status IN ('draft', 'in_review')`. `INSERT` restricted to `status = 'draft'`.
- **Editors & Admins**: Full `SELECT`, `INSERT`, and `UPDATE` across all non-deleted posts.
- **Admins**: `DELETE` permission.

### Role Function Security
Role checks call `public.get_user_role()`, a `SECURITY DEFINER` SQL function that reads directly from `public.profiles` rather than trusting unverified JWT metadata.

---

## 4. Storage Security (`blog-media` Bucket)

- **Bucket Access**: `public = true` (allows clean CDN image rendering on the public site).
- **Upload Policies**: Only authenticated users with a valid profile role (`public.get_user_role() IS NOT NULL`) can insert objects.
- **File Validation**: Restricted to accepted image MIME types (`image/jpeg`, `image/png`, `image/webp`, `image/gif`) and capped at **5 MB**.
- **Deletion Policies**: Only `admin` role users can delete files from storage.

---

## 5. Defense in Depth Checklist

1. **Environment Variables**: Never check `.env` files into version control. Only expose `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
2. **Service Role Key**: **NEVER** include `SUPABASE_SERVICE_ROLE_KEY` in frontend bundles.
3. **Draft Isolation**: The public website query hard-codes `.eq("status", "published")` and `.lte("published_at", now())` in addition to RLS protection.
4. **Soft Deletes**: Posts are marked with `deleted_at` timestamps rather than hard database deletes, enabling recovery if accidental deletions occur.
