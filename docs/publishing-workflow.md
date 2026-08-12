# Publishing Workflow & Editorial Guidelines

## Overview

Síkat-Aurora's blog content model implements an editorial workflow designed to maintain high story quality and brand alignment while making publishing easy for student and youth volunteers. There is currently no dedicated CMS frontend in this repo — until one exists, editorial actions described below are performed directly through the Supabase Dashboard/SQL Editor against the `posts` table.

---

## 1. Post Lifecycle & Statuses

```
 ┌─────────┐    Writer submits    ┌───────────┐    Editor approves    ┌───────────┐
 │  Draft  │ ───────────────────► │ In Review │ ────────────────────► │ Published │
 └─────────┘                      └─────┬─────┘                       └───────────┘
      ▲                                 │                                   │
      │        Editor requests edit     │                                   │ Editor archives
      └─────────────────────────────────┴───────────────────────────────────► ┌───────────┐
                                                                              │ Archived  │
                                                                              └───────────┘
```

### Status Definitions

- **Draft**: A work in progress created by a Writer or Editor. Only visible to the author and editors (via `posts` RLS). Not visible on the public website.
- **In Review**: Submitted by a Writer for editorial review. Lock-edited by the Writer until an Editor reviews or returns it to Draft.
- **Scheduled**: Approved by an Editor with a future `published_at` timestamp. Automatically displays on the public website once the timestamp passes.
- **Published**: Live on the public website. Visible on `/blog` and `/blog/:slug`.
- **Archived**: Hidden from the public website while preserving the entry in the database (`deleted_at` set).

---

## 2. Step-by-Step Publishing Guide

Until a dedicated CMS UI exists, these steps are performed directly against the `posts` table via the Supabase Dashboard Table Editor or SQL Editor.

### For Writers
1. Insert a new row in `posts` with `status = 'draft'`, your `author_id`, a title, a program category, and a short excerpt.
2. Write your content as Tiptap-compatible JSON (see §4) in the `body_json` column.
3. Update the row at any time while it stays in `draft`.
4. When ready, set `status = 'in_review'` for an Editor to review.

### For Editors & Admins
1. Query posts where `status = 'in_review'`.
2. Review formatting, tone, links, and imagery in the `body_json` content.
3. Check the `seo_title` and `seo_description` fields.
4. Set `published_at` (leave `null`/now for immediate publishing).
5. Set `is_featured = true` if this post should be highlighted in the hero section of the public blog page.
6. Set `status = 'published'` to make the story live.

---

## 3. Image & Media Guidelines

- **File Formats**: `.jpg`, `.png`, `.webp` preferred.
- **Max File Size**: **5 MB** per image.
- **Cover Dimensions**: Recommended aspect ratio is `16:9` (e.g. 1200×675 px).
- **Accessibility**: Always fill out the **Cover Alt Text** field with a concise description of the image content.

---

## 4. Rich-Text Editor Reference

The `body_json` column stores content as Tiptap-compatible JSON. Available formatting tools:
- **Headings**: `H2` for main section titles, `H3` for sub-sections.
- **Lists**: Bullet lists for items, Numbered lists for steps.
- **Quotes**: Blockquotes for participant quotes and testimonials.
- **Links**: Inline hyperlinking for partner sites and external press.
