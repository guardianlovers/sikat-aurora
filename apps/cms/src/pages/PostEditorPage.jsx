import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { POST_STATUS, STATUS_LABELS, ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from "@sikat-aurora/shared";
import {
  ArrowLeft, Save, Send, Eye, Globe, Archive, Upload, Trash2,
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, LinkIcon, ImageIcon, Undo2, Redo2, Loader2
} from "lucide-react";

// Post editor page with Tiptap rich-text editing and image upload
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function EditorToolbar({ editor }) {
  if (!editor) return null;

  const btn = (active, onClick, icon, label) => (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`rounded p-1.5 transition-colors ${
        active ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
      {btn(false, () => editor.chain().focus().setParagraph().run(), <span className="text-xs font-semibold">¶</span>, "Paragraph")}
      {btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 className="h-4 w-4" />, "Heading 2")}
      {btn(editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 className="h-4 w-4" />, "Heading 3")}
      <div className="mx-1 h-5 w-px bg-gray-200" />
      {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <Bold className="h-4 w-4" />, "Bold")}
      {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <Italic className="h-4 w-4" />, "Italic")}
      <div className="mx-1 h-5 w-px bg-gray-200" />
      {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), <List className="h-4 w-4" />, "Bullet List")}
      {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered className="h-4 w-4" />, "Numbered List")}
      {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), <Quote className="h-4 w-4" />, "Blockquote")}
      <div className="mx-1 h-5 w-px bg-gray-200" />
      {btn(editor.isActive("link"), () => {
        const url = window.prompt("Enter URL:");
        if (url) editor.chain().focus().setLink({ href: url }).run();
        else editor.chain().focus().unsetLink().run();
      }, <LinkIcon className="h-4 w-4" />, "Link")}
      {btn(false, () => {
        const url = window.prompt("Enter image URL:");
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }, <ImageIcon className="h-4 w-4" />, "Image")}
      <div className="mx-1 h-5 w-px bg-gray-200" />
      {btn(false, () => editor.chain().focus().undo().run(), <Undo2 className="h-4 w-4" />, "Undo")}
      {btn(false, () => editor.chain().focus().redo().run(), <Redo2 className="h-4 w-4" />, "Redo")}
    </div>
  );
}

export default function PostEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, canPublish } = useAuth();
  const isNew = !id;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [coverImagePath, setCoverImagePath] = useState("");
  const [coverImageAlt, setCoverImageAlt] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState(POST_STATUS.DRAFT);
  const [publishedAt, setPublishedAt] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Please select a valid image file (.jpg, .png, .webp, .gif).");
      return;
    }
    if (file.size > MAX_UPLOAD_SIZE) {
      setError("Cover image exceeds maximum allowed size of 5 MB.");
      return;
    }

    setUploadingCover(true);
    setError("");

    try {
      if (!supabase) throw new Error("Supabase is not configured.");

      const fileExt = file.name.split(".").pop();
      const fileName = `cover-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `${profile?.id || "anonymous"}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("blog-media").getPublicUrl(filePath);
      const publicUrl = data?.publicUrl || filePath;

      setCoverImagePath(publicUrl);
      if (!coverImageAlt) setCoverImageAlt(file.name.replace(/\.[^/.]+$/, ""));
      setDirty(true);
    } catch (err) {
      setError(err.message || "Failed to upload cover image.");
    } finally {
      setUploadingCover(false);
    }
  };
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      TiptapLink.configure({ openOnClick: false }),
      TiptapImage,
      Placeholder.configure({ placeholder: "Start writing your story..." }),
    ],
    content: "",
    onUpdate: () => setDirty(true),
  });

  // Fetch categories
  useEffect(() => {
    supabase
      .from("categories")
      .select("id, name")
      .eq("is_active", true)
      .order("name")
      .then(({ data }) => setCategories(data || []));
  }, []);

  // Fetch existing post
  useEffect(() => {
    if (isNew || !id) return;
    (async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Post not found.");
        setLoading(false);
        return;
      }

      setTitle(data.title || "");
      setSlug(data.slug || "");
      setSlugEdited(true);
      setExcerpt(data.excerpt || "");
      setCategoryId(data.category_id || "");
      setCoverImagePath(data.cover_image_path || "");
      setCoverImageAlt(data.cover_image_alt || "");
      setIsFeatured(data.is_featured || false);
      setStatus(data.status);
      setPublishedAt(data.published_at ? data.published_at.slice(0, 16) : "");
      setSeoTitle(data.seo_title || "");
      setSeoDescription(data.seo_description || "");
      if (editor && data.body_json) {
        editor.commands.setContent(data.body_json);
      }
      setLoading(false);
    })();
  }, [id, isNew, editor]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, slugEdited]);

  // Unsaved changes warning
  useEffect(() => {
    const handler = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const save = useCallback(
    async (overrideStatus) => {
      if (!title.trim()) {
        setError("Title is required.");
        return;
      }
      if (!slug.trim()) {
        setError("Slug is required.");
        return;
      }

      setSaving(true);
      setError("");

      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        body_json: editor?.getJSON() || null,
        cover_image_path: coverImagePath || null,
        cover_image_alt: coverImageAlt || null,
        category_id: categoryId || null,
        is_featured: isFeatured,
        status: overrideStatus || status,
        published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
      };

      try {
        if (isNew) {
          payload.author_id = profile.id;
          const { data, error } = await supabase
            .from("posts")
            .insert(payload)
            .select("id")
            .single();
          if (error) throw error;
          setDirty(false);
          navigate(`/posts/${data.id}/edit`, { replace: true });
        } else {
          const { error } = await supabase
            .from("posts")
            .update(payload)
            .eq("id", id);
          if (error) throw error;
          setDirty(false);
          if (overrideStatus) setStatus(overrideStatus);
        }
      } catch (err) {
        setError(err.message || "Failed to save.");
      } finally {
        setSaving(false);
      }
    },
    [title, slug, excerpt, editor, coverImagePath, coverImageAlt, categoryId, isFeatured, status, publishedAt, seoTitle, seoDescription, profile, isNew, id, navigate]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => navigate("/posts")}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Posts
        </button>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => save()}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            <Save className="h-3.5 w-3.5" />
            {saving ? "Saving…" : "Save Draft"}
          </button>
          {!canPublish && (
            <button
              onClick={() => save(POST_STATUS.IN_REVIEW)}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-60"
            >
              <Send className="h-3.5 w-3.5" />
              Submit for Review
            </button>
          )}
          {canPublish && (
            <button
              onClick={() => save(POST_STATUS.PUBLISHED)}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-60"
            >
              <Globe className="h-3.5 w-3.5" />
              Publish
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Editor form */}
      <div className="space-y-5">
        {/* Title */}
        <input
          type="text"
          placeholder="Story title"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setDirty(true); }}
          className="w-full border-0 bg-transparent font-display text-2xl font-bold text-gray-900 outline-none placeholder:text-gray-300 sm:text-3xl"
        />

        {/* Slug */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>/blog/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); setDirty(true); }}
            className="flex-1 border-0 bg-transparent text-sm text-gray-600 outline-none"
          />
        </div>

        {/* Metadata grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Category</label>
            <select
              value={categoryId}
              onChange={(e) => { setCategoryId(e.target.value); setDirty(true); }}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Publish Date</label>
            <input
              type="datetime-local"
              value={publishedAt}
              onChange={(e) => { setPublishedAt(e.target.value); setDirty(true); }}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => { setExcerpt(e.target.value); setDirty(true); }}
            rows={2}
            placeholder="A short summary for blog cards and SEO..."
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* Cover image upload & preview */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-700">Cover Image</label>
            {coverImagePath && (
              <button
                type="button"
                onClick={() => { setCoverImagePath(""); setCoverImageAlt(""); setDirty(true); }}
                className="flex items-center gap-1 text-xs text-red-600 hover:underline"
              >
                <Trash2 className="h-3 w-3" /> Remove Cover Image
              </button>
            )}
          </div>

          {coverImagePath ? (
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2">
              <img
                src={coverImagePath}
                alt={coverImageAlt || "Cover Preview"}
                className="h-44 w-full rounded object-cover"
              />
            </div>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Upload Image File</label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:border-primary">
                {uploadingCover ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <Upload className="h-4 w-4 text-primary" />
                )}
                <span>{uploadingCover ? "Uploading…" : "Choose Image File"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  disabled={uploadingCover}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Cover Alt Text (Accessibility)</label>
              <input
                type="text"
                value={coverImageAlt}
                onChange={(e) => { setCoverImageAlt(e.target.value); setDirty(true); }}
                placeholder="Describe the image for screen readers"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <details className="text-xs text-gray-400">
            <summary className="cursor-pointer hover:text-gray-600">Or paste external image URL / path</summary>
            <input
              type="text"
              value={coverImagePath}
              onChange={(e) => { setCoverImagePath(e.target.value); setDirty(true); }}
              placeholder="https://... or Supabase storage path"
              className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-primary"
            />
          </details>
        </div>

        {/* Featured toggle */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => { setIsFeatured(e.target.checked); setDirty(true); }}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-gray-700">Featured story</span>
          <span className="text-xs text-gray-400">(only one published story can be featured)</span>
        </label>

        {/* Article body */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500">Article Body</label>
          <div className="tiptap-editor overflow-hidden rounded-lg border border-gray-200">
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} className="px-5 py-4 [&_.tiptap]:min-h-[320px] [&_.tiptap]:outline-none" />
          </div>
        </div>

        {/* SEO */}
        <details className="rounded-lg border border-gray-200 bg-white">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-gray-700">
            SEO Settings
          </summary>
          <div className="space-y-3 border-t border-gray-100 px-4 py-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => { setSeoTitle(e.target.value); setDirty(true); }}
                placeholder={title || "Page title"}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">SEO Description</label>
              <textarea
                value={seoDescription}
                onChange={(e) => { setSeoDescription(e.target.value); setDirty(true); }}
                rows={2}
                placeholder={excerpt || "Meta description"}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
