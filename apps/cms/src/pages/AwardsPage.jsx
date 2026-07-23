import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from "@sikat-aurora/shared";
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trophy,
  Upload,
  Image as ImageIcon,
  Sparkles,
  MoreVertical
} from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";

export default function AwardsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("awards"); // 'awards' or 'gallery'

  // Kebab & Modal state
  const [activeKebabId, setActiveKebabId] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("award"); // 'award' or 'gallery'

  // Awards state
  const [awards, setAwards] = useState([]);
  const [loadingAwards, setLoadingAwards] = useState(true);

  // Gallery state
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // General state
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  // Award Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("National");
  const [grantor, setGrantor] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [sortOrder, setSortOrder] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAwards();
    fetchGallery();
  }, []);

  async function fetchAwards() {
    setLoadingAwards(true);
    try {
      if (!supabase) return;
      const { data } = await supabase
        .from("awards")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      setAwards(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAwards(false);
    }
  }

  async function fetchGallery() {
    setLoadingGallery(true);
    try {
      if (!supabase) return;
      const { data } = await supabase
        .from("media")
        .select("*")
        .eq("caption", "impact-gallery")
        .order("created_at", { ascending: false })
        .limit(12);
      setGalleryPhotos(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGallery(false);
    }
  }

  function startAddAward() {
    setEditingId(null);
    setTitle("");
    setLevel("National");
    setGrantor("");
    setYear(new Date().getFullYear().toString());
    setSortOrder(awards.length);
    setIsEditing(true);
    setMsg(null);
    setError(null);
  }

  function startEditAward(item) {
    setEditingId(item.id);
    setTitle(item.title);
    setLevel(item.level || "National");
    setGrantor(item.grantor || "");
    setYear(item.year || "");
    setSortOrder(item.sort_order || 0);
    setIsEditing(true);
    setMsg(null);
    setError(null);
  }

  async function handleSaveAward(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Award Title is required.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setMsg(null);

    try {
      const payload = {
        title: title.trim(),
        level: level.trim(),
        grantor: grantor.trim() || null,
        year: year.trim() || null,
        sort_order: Number(sortOrder),
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error } = await supabase
          .from("awards")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        setMsg("Award updated!");
      } else {
        const { error } = await supabase.from("awards").insert(payload);
        if (error) throw error;
        setMsg("New award added!");
      }

      setIsEditing(false);
      fetchAwards();
    } catch (err) {
      setError(err.message || "Failed to save award.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteAward(item) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await supabase.from("awards").delete().eq("id", item.id);
      setMsg("Award deleted.");
      fetchAwards();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (galleryPhotos.length + files.length > 12) {
      setError(`Maximum limit is 12 photos. You currently have ${galleryPhotos.length} photos.`);
      return;
    }

    setUploadingPhoto(true);
    setError(null);
    setMsg(null);

    for (const file of files) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError(`File ${file.name} is not a valid image format.`);
        continue;
      }
      if (file.size > MAX_UPLOAD_SIZE) {
        setError(`File ${file.name} exceeds 5 MB size limit.`);
        continue;
      }

      try {
        const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filePath = `gallery/${Date.now()}_${cleanName}`;

        const { error: uploadErr } = await supabase.storage
          .from("blog-media")
          .upload(filePath, file, { upsert: true });

        if (uploadErr) throw uploadErr;

        const { data: urlData } = supabase.storage.from("blog-media").getPublicUrl(filePath);

        await supabase.from("media").insert({
          storage_path: urlData?.publicUrl || filePath,
          file_name: file.name,
          mime_type: file.type,
          file_size: file.size,
          caption: "impact-gallery",
          uploaded_by: user.id,
        });
      } catch (err) {
        setError(err.message);
      }
    }

    setUploadingPhoto(false);
    setMsg("Gallery photo(s) uploaded successfully!");
    fetchGallery();
  }

  async function handleDeleteGalleryPhoto(item) {
    if (!window.confirm("Remove this photo from the Impact Gallery?")) return;
    try {
      await supabase.from("media").delete().eq("id", item.id);
      setMsg("Photo removed from gallery.");
      fetchGallery();
    } catch (err) {
      setError(err.message);
    }
  }

  const levelStyles = {
    "Municipal / Provincial": "bg-blue-100 text-blue-800 border-blue-200",
    National: "bg-amber-100 text-amber-800 border-amber-200",
    International: "bg-purple-100 text-purple-800 border-purple-200",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Impact, Recognition &amp; Photo Gallery</h1>
          <p className="text-sm text-gray-500">
            Manage public awards list and Impact in Action photo gallery (Max 12 photos).
          </p>
        </div>

        <div className="flex gap-1.5 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("awards")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "awards" ? "bg-navy text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Trophy className="h-3.5 w-3.5" />
            <span>Awards ({awards.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "gallery" ? "bg-navy text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Impact Gallery ({galleryPhotos.length}/12)</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {msg && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 border border-emerald-200">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* ── TAB 1: AWARDS MANAGEMENT ── */}
      {activeTab === "awards" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            {!isEditing && (
              <button
                onClick={startAddAward}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add Award / Grant
              </button>
            )}
          </div>

          {isEditing && (
            <form onSubmit={handleSaveAward} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md space-y-4">
              <h2 className="text-base font-bold text-navy">
                {editingId ? "Edit Award" : "New Award / Recognition"}
              </h2>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Award Title / Honor</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. National Winner, Spark-A-Change Challenge"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Level / Category</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm outline-none focus:border-primary"
                  >
                    <option value="Municipal / Provincial">Municipal / Provincial</option>
                    <option value="National">National</option>
                    <option value="International">International</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Grantor / Awarding Body</label>
                  <input
                    type="text"
                    placeholder="e.g. J. Amado Araneta Foundation"
                    value={grantor}
                    onChange={(e) => setGrantor(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Year / Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 2024"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Award"}
                </button>
              </div>
            </form>
          )}

          {loadingAwards ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : awards.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm">
              <Trophy className="mx-auto mb-2 h-8 w-8 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">No awards added yet.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3">Award Title</th>
                    <th className="px-4 py-3">Grantor</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {awards.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.7rem] font-bold ${
                            levelStyles[a.level] || "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {a.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-900">{a.title}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{a.grantor || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => setActiveKebabId(activeKebabId === a.id ? null : a.id)}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-navy transition-colors"
                            title="Actions"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {activeKebabId === a.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveKebabId(null)}
                              />
                              <div className="absolute right-0 z-20 mt-1 w-32 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg animate-in fade-in zoom-in-95 duration-100">
                                <button
                                  onClick={() => {
                                    setActiveKebabId(null);
                                    startEditAward(a);
                                  }}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                  <span>Edit Award</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveKebabId(null);
                                    handleDeleteAward(a);
                                  }}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: IMPACT GALLERY (MAX 12 PHOTOS) ── */}
      {activeTab === "gallery" && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Impact in Action Gallery ({galleryPhotos.length} / 12 Photos)
              </h3>
              <p className="text-xs text-gray-500">
                Upload up to 12 high-res community photos displayed in the Impact section gallery.
              </p>
            </div>

            <label
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark ${
                galleryPhotos.length >= 12 ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {uploadingPhoto ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              <span>{galleryPhotos.length >= 12 ? "Limit Reached (12/12)" : "Upload Gallery Photos"}</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                disabled={uploadingPhoto || galleryPhotos.length >= 12}
                className="hidden"
              />
            </label>
          </div>

          {loadingGallery ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : galleryPhotos.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm">
              <ImageIcon className="mx-auto mb-2 h-8 w-8 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">No gallery photos uploaded yet.</p>
              <p className="mt-1 text-xs text-gray-400">Click "Upload Gallery Photos" above to add up to 12 photos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {galleryPhotos.map((item, idx) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={item.storage_path}
                      alt={item.file_name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-2 flex items-center justify-between bg-white">
                    <span className="text-[0.68rem] font-bold text-gray-500">Photo #{idx + 1}</span>
                    <button
                      onClick={() => handleDeleteGalleryPhoto(item)}
                      className="rounded p-1 text-red-600 hover:bg-red-50"
                      title="Remove Photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
