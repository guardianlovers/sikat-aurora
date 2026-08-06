# Síkat-Aurora Monorepo

This repository contains the official frontend web applications for **Síkat-Aurora Inc.**, a youth-led community organization in Baler, Aurora, Philippines.

The repository is organized as an `npm workspaces` monorepo containing:

1. **Public Website** (`apps/website`): Fast, public-facing, responsive site with program details, leadership, transparent funding tracker, and dynamic blog powered by Supabase.
2. **Shared Package** (`packages/shared`): Shared Supabase client, constants, and type definitions.

---

## Workspace Structure

```
.
├── apps/
│   └── website/             # Public web app (React + Vite + Tailwind + Framer Motion)
├── packages/
│   └── shared/              # Shared Supabase client, constants, and JSDoc types
├── supabase/
│   ├── migrations/          # Schema, RLS policies, triggers, and storage setup
│   └── seed.sql             # Seed data for categories and initial posts
├── docs/
│   ├── security-policy.md   # Security architecture, RLS, and RBAC specifications
│   └── publishing-workflow.md # Editorial post lifecycle guide
├── package.json             # Root npm workspaces config
└── README.md
```

---

## Quick Start

### Prerequisites
- **Node.js**: v18+ and `npm` v9+

### 1. Install Dependencies
Run from the root directory:
```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` in the app directory:

```bash
# Public website environment
cp apps/website/.env.example apps/website/.env
```

Fill in your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

> **Note**: If Supabase environment variables are missing on the public website, it automatically falls back to local data so development works out of the box.

---

## Development

```bash
# Run public website (default: http://localhost:5173)
npm run dev --workspace=apps/website
```

---

## Build for Production

```bash
# Build public website -> apps/website/dist
npm run build --workspace=apps/website
```

---

## Backend & Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Execute `supabase/migrations/20260722000000_init.sql` in the Supabase SQL Editor.
3. Disable public sign-up under **Authentication > Settings**.
4. Create the initial administrator user and set their role to `admin` in `public.profiles`.
5. For full details, see [`supabase/README.md`](supabase/README.md).

---

## Documentation

- 🔒 [Security Policy & Architecture](docs/security-policy.md)
- 📝 [Publishing Workflow Guide](docs/publishing-workflow.md)
- 🗄️ [Supabase Database Setup](supabase/README.md)

---

## Tech Stack

- **Frontend**: React 19, Vite, React Router v7
- **Styling**: Tailwind CSS v3, Framer Motion
- **Backend & Auth**: Supabase (Database, Auth, Storage)
- **Rich Text Editor**: Tiptap v2
- **Monorepo**: npm workspaces

---

## License

© 2026 Síkat-Aurora Inc. All rights reserved.