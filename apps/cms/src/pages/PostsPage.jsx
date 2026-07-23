import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { POST_STATUS, STATUS_LABELS } from "@sikat-aurora/shared";
import {
  Plus, Search, Filter, Edit, Eye, Copy, Archive, Trash2,
  ChevronLeft, ChevronRight, MoreHorizontal, Clock, CheckCircle
} from "lucide-react";

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: POST_STATUS.DRAFT, label: "Drafts" },
  { key: POST_STATUS.IN_REVIEW, label: "In Review" },
  { key: POST_STATUS.PUBLISHED, label: "Published" },
  { key: POST_STATUS.SCHEDULED, label: "Scheduled" },
  { key: POST_STATUS.ARCHIVED, label: "Archived" },
];

const STATUS_BADGE = {
  [POST_STATUS.DRAFT]: "bg-gray-100 text-gray-600",
  [POST_STATUS.IN_REVIEW]: "bg-amber-100 text-amber-700",
  [POST_STATUS.PUBLISHED]: "bg-green-100 text-green-700",
  [POST_STATUS.SCHEDULED]: "bg-blue-100 text-blue-700",
  [POST_STATUS.ARCHIVED]: "bg-red-100 text-red-600",
};

export default function PostsPage() {
  const { profile, canPublish } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [statusFilter]);

  async function fetchPosts() {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from("posts")
        .select(`
          id, title, slug, status, is_featured, published_at, updated_at, created_at,
          categories (name, color),
          profiles:author_id (full_name)
        `)
        .is("deleted_at", null)
        .order("updated_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const filtered = posts.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Posts</h1>
          <p className="text-sm text-gray-500">
            {posts.length} {posts.length === 1 ? "story" : "stories"}
          </p>
        </div>
        <Link
          to="/posts/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          New Story
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Status tabs */}
      <div className="mb-4 flex gap-1 overflow-x-auto rounded-lg border border-gray-200 bg-white p-1">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === tab.key
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white py-16 text-center">
          <p className="text-gray-500">
            {search ? "No posts match your search." : "No posts yet. Create your first story!"}
          </p>
        </div>
      ) : (
        /* Posts table */
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">Title</th>
                  <th className="hidden px-4 py-3 font-medium text-gray-600 md:table-cell">Category</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="hidden px-4 py-3 font-medium text-gray-600 lg:table-cell">Author</th>
                  <th className="hidden px-4 py-3 font-medium text-gray-600 sm:table-cell">Updated</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((post) => (
                  <tr key={post.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/posts/${post.id}/edit`}
                          className="font-medium text-gray-900 no-underline hover:text-primary"
                        >
                          {post.title || "Untitled"}
                        </Link>
                        {post.is_featured && (
                          <span className="rounded bg-gold/20 px-1.5 py-0.5 text-[0.6rem] font-bold text-navy">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <span className="text-gray-500">{post.categories?.name || "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                          STATUS_BADGE[post.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {STATUS_LABELS[post.status] || post.status}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-gray-500 lg:table-cell">
                      {post.profiles?.full_name || "—"}
                    </td>
                    <td className="hidden px-4 py-3 text-gray-400 sm:table-cell">
                      {formatDate(post.updated_at)}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/posts/${post.id}/edit`}
                        className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-600 no-underline transition-colors hover:bg-gray-100 hover:text-primary"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
