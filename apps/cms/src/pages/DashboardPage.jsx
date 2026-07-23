import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { POST_STATUS, STATUS_LABELS, ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from "@sikat-aurora/shared";
import {
  FileText,
  Globe,
  Edit,
  Clock,
  Image as ImageIcon,
  Users,
  Send,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  FolderOpen,
  Sparkles,
  CheckCircle,
  Filter,
  X
} from "lucide-react";

export default function DashboardPage() {
  const { profile, user, canPublish } = useAuth();
  const navigate = useNavigate();

  // Feed state
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedFilter, setFeedFilter] = useState("all"); // 'all', 'mine', 'published', 'drafts'

  // Quick Composer state
  const [composerOpen, setComposerOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [coverImagePath, setCoverImagePath] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [posting, setPosting] = useState(false);
  const [composerError, setComposerError] = useState("");

  useEffect(() => {
    fetchFeedData();
  }, [feedFilter]);

  useEffect(() => {
    if (supabase) {
      supabase
        .from("categories")
        .select("id, name, color")
        .eq("is_active", true)
        .order("name")
        .then(({ data }) => setCategories(data || []));
    }
  }, []);

  async function fetchFeedData() {
    setLoading(true);
    try {
      if (!supabase) {
        setLoading(false);
        return;
      }

      let query = supabase
        .from("posts")
        .select(`
          id, title, slug, excerpt, cover_image_path, cover_image_alt,
          status, is_featured, published_at, created_at, updated_at,
          categories (id, name, color),
          profiles:author_id (id, full_name, avatar_url, role)
        `)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (feedFilter === "mine" && user) {
        query = query.eq("author_id", user.id);
      } else if (feedFilter === "published") {
        query = query.eq("status", POST_STATUS.PUBLISHED);
      } else if (feedFilter === "drafts") {
        query = query.eq("status", POST_STATUS.DRAFT);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error("Failed to fetch feed:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setComposerError("Please select an image file (.jpg, .png, .webp, .gif).");
      return;
    }
    if (file.size > MAX_UPLOAD_SIZE) {
      setComposerError("Cover image exceeds maximum allowed size of 5 MB.");
      return;
    }

    setUploadingCover(true);
    setComposerError("");

    try {
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${user?.id || "composer"}/${Date.now()}_${cleanFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-media")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("blog-media").getPublicUrl(filePath);
      setCoverImagePath(data?.publicUrl || filePath);
    } catch (err) {
      setComposerError(err.message || "Failed to upload image.");
    } finally {
      setUploadingCover(false);
    }
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleQuickPost = async (targetStatus = POST_STATUS.DRAFT) => {
    if (!title.trim()) {
      setComposerError("Title is required.");
      return;
    }

    setPosting(true);
    setComposerError("");

    const generatedSlug = `${slugify(title.trim())}-${Date.now().toString(36)}`;

    try {
      const payload = {
        title: title.trim(),
        slug: generatedSlug,
        excerpt: excerpt.trim() || null,
        category_id: categoryId || null,
        cover_image_path: coverImagePath || null,
        author_id: user.id,
        status: targetStatus,
        published_at: targetStatus === POST_STATUS.PUBLISHED ? new Date().toISOString() : null,
      };

      const { data, error } = await supabase
        .from("posts")
        .insert(payload)
        .select("id")
        .single();

      if (error) throw error;

      // Reset form
      setTitle("");
      setExcerpt("");
      setCategoryId("");
      setCoverImagePath("");
      setComposerOpen(false);

      // Refresh feed
      fetchFeedData();
    } catch (err) {
      setComposerError(err.message || "Failed to publish post.");
    } finally {
      setPosting(false);
    }
  };

  const statusBadge = {
    [POST_STATUS.DRAFT]: "bg-gray-100 text-gray-700 border-gray-200",
    [POST_STATUS.IN_REVIEW]: "bg-amber-50 text-amber-700 border-amber-200",
    [POST_STATUS.PUBLISHED]: "bg-emerald-50 text-emerald-700 border-emerald-200",
    [POST_STATUS.SCHEDULED]: "bg-sky-50 text-sky-700 border-sky-200",
    [POST_STATUS.ARCHIVED]: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const formatTimeAgo = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);
    if (diffSec < 60) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return date.toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
  };

  // Handle Esc key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setComposerOpen(false);
    };
    if (composerOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [composerOpen]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ── Top Composer Trigger Bar ── */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white shadow-sm">
            {profile?.full_name?.[0]?.toUpperCase() || "S"}
          </div>
          <button
            onClick={() => setComposerOpen(true)}
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-sm text-gray-500 transition-colors hover:border-primary/40 hover:bg-gray-100"
          >
            What's the latest article from your program, {profile?.full_name?.split(" ")[0] || "Volunteer"}?
          </button>
          <button
            onClick={() => setComposerOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Post Article</span>
          </button>
        </div>
      </div>

      {/* ── Composer Modal Overlay ── */}
      {composerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h2 className="text-base font-bold text-gray-900">Create New Article</h2>
              </div>
              <button
                onClick={() => setComposerOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content Form */}
            <div className="space-y-4 p-5 max-h-[80vh] overflow-y-auto">
              {composerError && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                  {composerError}
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Article Title</label>
                <input
                  type="text"
                  placeholder="e.g. Field Notes — Five Saturdays in Zabali"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Article Summary / Update</label>
                <textarea
                  rows={3}
                  placeholder="Share a short article update or excerpt..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm leading-relaxed text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Program Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-primary"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Cover Image</label>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 hover:border-primary hover:bg-gray-100">
                    {uploadingCover ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : (
                      <Upload className="h-4 w-4 text-primary" />
                    )}
                    {coverImagePath ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 font-semibold"><CheckCircle className="h-3.5 w-3.5" /> Image Attached</span>
                    ) : (
                      <span>Attach Image</span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      disabled={uploadingCover}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {coverImagePath && (
                <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-1">
                  <img src={coverImagePath} alt="" className="h-32 w-full rounded object-cover" />
                  <button
                    type="button"
                    onClick={() => setCoverImagePath("")}
                    className="absolute right-3 top-3 rounded-full bg-black/60 p-1 text-white hover:bg-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 bg-gray-50 px-5 py-3.5">
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-200/60"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickPost(POST_STATUS.DRAFT)}
                  disabled={posting}
                  className="rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {posting ? "Saving..." : "Save Draft"}
                </button>
                {canPublish ? (
                  <button
                    type="button"
                    onClick={() => handleQuickPost(POST_STATUS.PUBLISHED)}
                    disabled={posting}
                    className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 shadow-sm"
                  >
                    {posting ? "Publishing..." : "Publish Article"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleQuickPost(POST_STATUS.IN_REVIEW)}
                    disabled={posting}
                    className="rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 disabled:opacity-50 shadow-sm"
                  >
                    {posting ? "Submitting..." : "Submit Article"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Feed Filter Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div className="flex gap-1.5 overflow-x-auto">
          {[
            { key: "all", label: "All Activity Feed" },
            { key: "mine", label: "My Stories" },
            { key: "published", label: "Published Live" },
            { key: "drafts", label: "Drafts" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFeedFilter(tab.key)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                feedFilter === tab.key
                  ? "bg-navy text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500 font-medium">
          {posts.length} {posts.length === 1 ? "story" : "stories"}
        </span>
      </div>

      {/* ── Timeline Feed List ── */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm">
          <FileText className="mx-auto mb-2 h-8 w-8 text-gray-300" />
          <p className="text-gray-500 text-sm font-medium">No stories found in this view.</p>
          <p className="mt-1 text-xs text-gray-400">Post a story using the composer above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
            >
              {/* Post Header: Author info & status badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/10 text-xs font-bold text-navy">
                    {post.profiles?.full_name?.[0]?.toUpperCase() || "A"}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      {post.profiles?.full_name || "Volunteer Author"}
                    </p>
                    <div className="flex items-center gap-1.5 text-[0.7rem] text-gray-400">
                      <time dateTime={post.created_at}>{formatTimeAgo(post.created_at)}</time>
                      {post.categories?.name && (
                        <>
                          <span>·</span>
                          <span
                            className="font-medium"
                            style={{ color: post.categories.color || "#1D4A6F" }}
                          >
                            {post.categories.name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-bold ${
                    statusBadge[post.status] || "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {STATUS_LABELS[post.status] || post.status}
                </span>
              </div>

              {/* Post Body & Cover Image */}
              <div className="space-y-2">
                <Link
                  to={`/posts/${post.id}/edit`}
                  className="font-display text-lg font-bold text-gray-900 no-underline transition-colors hover:text-primary block"
                >
                  {post.title || "Untitled Story"}
                </Link>

                {post.excerpt && (
                  <p className="text-xs leading-relaxed text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                {post.cover_image_path && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                    <img
                      src={post.cover_image_path}
                      alt={post.cover_image_alt || post.title}
                      className="max-h-80 w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  </div>
                )}
              </div>

              {/* Post Footer Actions */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-3">
                  <Link
                    to={`/posts/${post.id}/edit`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 no-underline transition-colors hover:text-primary"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    <span>Edit Story</span>
                  </Link>

                  {post.status === POST_STATUS.PUBLISHED && (
                    <a
                      href={`http://localhost:5173/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-navy no-underline transition-colors hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>View Live</span>
                    </a>
                  )}
                </div>

                <span className="text-[0.7rem] text-gray-400">
                  ID: {post.slug}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
