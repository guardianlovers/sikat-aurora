# Publishing Workflow & Editorial Guidelines

## Overview

The Síkat-Aurora CMS implements an editorial workflow designed to maintain high story quality and brand alignment while making publishing easy for student and youth volunteers.

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

- **Draft**: A work in progress created by a Writer or Editor. Only visible to the author and editors in the CMS. Not visible on the public website.
- **In Review**: Submitted by a Writer for editorial review. Lock-edited by the Writer until an Editor reviews or returns it to Draft.
- **Scheduled**: Approved by an Editor with a future `published_at` timestamp. Automatically displays on the public website once the timestamp passes.
- **Published**: Live on the public website. Visible on `/blog` and `/blog/:slug`.
- **Archived**: Hidden from the public website while preserving the entry in the CMS history.

---

## 2. Step-by-Step Publishing Guide

### For Writers
1. Log in to the CMS dashboard at `cms.sikat-aurora.org` (or local dev port).
2. Click **New Story** in the top right of the Posts page.
3. Enter your story title, select a program category (e.g. *Abot Ko Ang Libro*), and add a short excerpt.
4. Write your content using the rich-text editor (formatting headings, bold, bullet points, quotes, and inserting images).
5. Click **Save Draft** at any time to save your work.
6. When ready, click **Submit for Review**. An Editor will review your post.

### For Editors & Admins
1. Navigate to the **In Review** tab on the Posts dashboard.
2. Open the story to review formatting, tone, links, and imagery.
3. Check SEO title and description fields under **SEO Settings**.
4. Set a **Publish Date** (leave empty for immediate publishing).
5. Toggle **Featured story** if this post should be highlighted in the hero section of the public blog page.
6. Click **Publish** to make the story live.

---

## 3. Image & Media Guidelines

- **File Formats**: `.jpg`, `.png`, `.webp` preferred.
- **Max File Size**: **5 MB** per image.
- **Cover Dimensions**: Recommended aspect ratio is `16:9` (e.g. 1200×675 px).
- **Accessibility**: Always fill out the **Cover Alt Text** field with a concise description of the image content.

---

## 4. Rich-Text Editor Reference

The CMS uses Tiptap JSON to format content. Available formatting tools:
- **Headings**: `H2` for main section titles, `H3` for sub-sections.
- **Lists**: Bullet lists for items, Numbered lists for steps.
- **Quotes**: Blockquotes for participant quotes and testimonials.
- **Links**: Inline hyperlinking for partner sites and external press.
