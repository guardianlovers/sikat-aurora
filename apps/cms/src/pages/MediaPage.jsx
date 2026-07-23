import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from "@sikat-aurora/shared";
import { Upload, Trash2, Copy, Check, Image as ImageIcon, Loader2 } from "lucide-react";

export default function MediaPage() {
  const { user, canManageUsers } = useAuth();
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("media")
        .select(`
          id, storage_path, file_name, mime_type, file_size, created_at,
          profiles:uploaded_by (full_name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMediaList(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    setError(null);

    for (const file of files) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError(`File ${file.name} is not a supported image format.`);
        continue;
      }
      if (file.size > MAX_UPLOAD_SIZE) {
        setError(`File ${file.name} exceeds the 5 MB size limit.`);
        continue;
      }

      const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${user?.id || "media"}/${Date.now()}_${cleanFileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("blog-media")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        setError(`Upload failed: ${uploadError.message}`);
        continue;
      }

      // Record in media table
      const { error: dbError } = await supabase.from("media").insert({
        storage_path: filePath,
        file_name: file.name,
        mime_type: file.type,
        file_size: file.size,
        uploaded_by: user.id,
      });

      if (dbError) {
        setError(`Database insert failed: ${dbError.message}`);
      }
    }

    setUploading(false);
    fetchMedia();
  }

  function getPublicUrl(path) {
    const { data } = supabase.storage.from("blog-media").getPublicUrl(path);
    return data?.publicUrl || path;
  }

  function copyUrl(path, id) {
    const url = getPublicUrl(path);
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete ${item.file_name}?`)) return;

    try {
      // Storage delete
      await supabase.storage.from("blog-media").remove([item.storage_path]);
      // DB delete
      await supabase.from("media").delete().eq("id", item.id);
      setMediaList((prev) => prev.filter((m) => m.id !== item.id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500">
            Upload and manage images for blog posts and article covers.
          </p>
        </div>

        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : mediaList.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white py-16 text-center">
          <ImageIcon className="mx-auto mb-2 h-8 w-8 text-gray-300" />
          <p className="text-gray-500">No media uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {mediaList.map((item) => {
            const publicUrl = getPublicUrl(item.storage_path);
            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={publicUrl}
                    alt={item.file_name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-2">
                  <p className="truncate text-xs font-medium text-gray-800" title={item.file_name}>
                    {item.file_name}
                  </p>
                  <p className="text-[0.68rem] text-gray-400">
                    {(item.file_size / 1024).toFixed(0)} KB
                  </p>
                </div>
                {/* Overlay actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => copyUrl(item.storage_path, item.id)}
                    title="Copy URL"
                    className="rounded bg-white p-1.5 text-gray-700 hover:text-primary"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  {canManageUsers && (
                    <button
                      onClick={() => handleDelete(item)}
                      title="Delete Image"
                      className="rounded bg-white p-1.5 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
