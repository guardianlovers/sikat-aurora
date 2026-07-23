# Supabase — Síkat-Aurora CMS

This directory contains the database schema and seed data for the Síkat-Aurora CMS.

## Structure

```
supabase/
├── migrations/
│   └── 20260722000000_init.sql   # Full schema, functions, triggers, RLS
├── seed.sql                       # Development seed data (categories + sample posts)
└── README.md                      # This file
```

## Setup

### 1. Create a Supabase Project

Go to [supabase.com](https://supabase.com) and create a new project. Note down:
- **Project URL** → `VITE_SUPABASE_URL`
- **Anon (public) key** → `VITE_SUPABASE_PUBLISHABLE_KEY`

### 2. Run the Migration

In the Supabase Dashboard → SQL Editor, paste and run `migrations/20260722000000_init.sql`.

Or use the Supabase CLI:
```bash
npx supabase db push
```

### 3. Disable Public Signup

In Supabase Dashboard → Authentication → Settings → Auth Providers:
- **Disable** "Enable sign up" to prevent public registration.
- Users should only be created by admins through the CMS.

### 4. Create the First Admin User

In Supabase Dashboard → Authentication → Users → "Add User":
- Enter email and password for the first administrator.
- The `handle_new_user` trigger will automatically create a profile with role `writer`.

Then update the role to `admin` via SQL Editor:
```sql
UPDATE public.profiles SET role = 'admin' WHERE id = '<USER_UUID>';
```

### 5. Seed Development Data

After creating the admin user, edit `seed.sql`:
- Replace `REPLACE_WITH_ADMIN_UUID` with the admin's UUID.
- Uncomment the post inserts.
- Run the file in the SQL Editor.

### 6. Configure Storage

The migration automatically creates a `blog-media` storage bucket. Verify it exists in:
Supabase Dashboard → Storage → Buckets.

## Security Model

See the [Security Policy documentation](../docs/security-policy.md) for a full breakdown of:
- Row Level Security policies
- Role-based access control
- Storage policies
- Authentication requirements
