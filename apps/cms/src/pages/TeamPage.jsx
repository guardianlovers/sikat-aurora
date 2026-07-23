import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from "@sikat-aurora/shared";
import {
  Users,
  UserPlus,
  Edit2,
  Trash2,
  Upload,
  Plus,
  Loader2,
  CheckCircle,
  AlertCircle,
  MoveUp,
  MoveDown,
  UserCheck,
  MoreVertical
} from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";

export default function TeamPage() {
  const { user, canPublish } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  // Kebab menu state
  const [activeKebabId, setActiveKebabId] = useState(null);

  // Delete Confirm Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [tier, setTier] = useState(2); // 0: Exec Director, 1: Deputy, 2: Directorate
  const [role, setRole] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  async function fetchTeamMembers() {
    setLoading(true);
    setError(null);
    try {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("tier", { ascending: true })
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function startAdd() {
    setEditingId(null);
    setName("");
    setTitle("");
    setTier(2);
    setRole("");
    setPhotoUrl("");
    setSortOrder(members.length);
    setIsEditing(true);
    setMsg(null);
    setError(null);
  }

  function startEdit(member) {
    setEditingId(member.id);
    setName(member.name);
    setTitle(member.title);
    setTier(member.tier ?? 2);
    setRole(member.role || "");
    setPhotoUrl(member.photo_url || "");
    setSortOrder(member.sort_order || 0);
    setIsEditing(true);
    setMsg(null);
    setError(null);
  }

  function cancelForm() {
    setIsEditing(false);
    setEditingId(null);
  }

  function promptDelete(member) {
    setMemberToDelete(member);
    setDeleteModalOpen(true);
  }

  async function confirmDelete() {
    if (!memberToDelete) return;
    try {
      const { error } = await supabase.from("team_members").delete().eq("id", memberToDelete.id);
      if (error) throw error;
      setMsg(`${memberToDelete.name} removed from team.`);
      setDeleteModalOpen(false);
      setMemberToDelete(null);
      fetchTeamMembers();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Please select a valid image file.");
      return;
    }
    if (file.size > MAX_UPLOAD_SIZE) {
      setError("Image size must be under 5 MB.");
      return;
    }

    setUploadingPhoto(true);
    setError(null);

    try {
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const filePath = `team/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-media")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("blog-media").getPublicUrl(filePath);
      setPhotoUrl(data?.publicUrl || filePath);
    } catch (err) {
      setError(err.message || "Failed to upload photo.");
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !title.trim()) {
      setError("Name and Title are required.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setMsg(null);

    try {
      const payload = {
        name: name.trim(),
        title: title.trim(),
        tier: Number(tier),
        role: role.trim() || null,
        photo_url: photoUrl || null,
        sort_order: Number(sortOrder),
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error } = await supabase
          .from("team_members")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        setMsg("Team member updated successfully!");
      } else {
        const { error } = await supabase
          .from("team_members")
          .insert(payload);
        if (error) throw error;
        setMsg("New team member added!");
      }

      setIsEditing(false);
      fetchTeamMembers();
    } catch (err) {
      setError(err.message || "Failed to save team member.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(member) {
    if (!window.confirm(`Are you sure you want to remove ${member.name} from the team roster?`)) return;

    try {
      const { error } = await supabase.from("team_members").delete().eq("id", member.id);
      if (error) throw error;
      setMsg(`${member.name} removed from team.`);
      fetchTeamMembers();
    } catch (err) {
      setError(err.message);
    }
  }

  const tierLabels = {
    0: "Executive Director (Tier 0)",
    1: "Deputy Director (Tier 1)",
    2: "Directorate Member (Tier 2)",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Organizational Structure &amp; Team</h1>
          <p className="text-sm text-gray-500">
            Manage the youth leadership roster displayed on the public "The Team" page.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={startAdd}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark shadow-sm"
          >
            <UserPlus className="h-4 w-4" />
            Add Team Member
          </button>
        )}
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

      {/* Edit / Add Modal Form */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md space-y-4">
          <h2 className="text-base font-bold text-navy">
            {editingId ? "Edit Team Member" : "New Team Member"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. RJ Belen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Title / Designation</label>
              <input
                type="text"
                required
                placeholder="e.g. Executive Director"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Org Level / Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm outline-none focus:border-primary"
              >
                <option value={0}>Tier 0 — Executive Director</option>
                <option value={1}>Tier 1 — Deputy Executive Director</option>
                <option value={2}>Tier 2 — Directorate Lead</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Role / Responsibilities Description</label>
            <textarea
              rows={2}
              placeholder="e.g. Presides over Executive Committee & executes policies."
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Portrait Photo</label>
            <div className="flex items-center gap-4">
              {photoUrl ? (
                <img src={photoUrl} alt="" className="h-16 w-16 rounded-full object-cover border border-gray-200" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-400">
                  No Photo
                </div>
              )}
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-primary hover:bg-gray-100">
                {uploadingPhoto ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <Upload className="h-4 w-4 text-primary" />}
                <span>{photoUrl ? "Change Photo" : "Upload Portrait Photo"}</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploadingPhoto} className="hidden" />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={cancelForm}
              className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Member"}
            </button>
          </div>
        </form>
      )}

      {/* Roster List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : members.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm">
          <Users className="mx-auto mb-2 h-8 w-8 text-gray-300" />
          <p className="text-sm font-medium text-gray-500">No team members added yet.</p>
          <p className="mt-1 text-xs text-gray-400">Click "Add Team Member" to build your dynamic org structure.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 font-semibold">
              <tr>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Designation / Role</th>
                <th className="px-4 py-3">Org Tier</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {m.photo_url ? (
                        <img src={m.photo_url} alt="" className="h-10 w-10 rounded-full object-cover border border-gray-200 shrink-0" />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                          {m.name?.[0]?.toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900">{m.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold text-primary">{m.title}</p>
                    {m.role && <p className="text-[0.72rem] text-gray-500 line-clamp-1">{m.role}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-navy/10 px-2.5 py-0.5 text-[0.7rem] font-semibold text-navy">
                      {tierLabels[m.tier] || `Tier ${m.tier}`}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setActiveKebabId(activeKebabId === m.id ? null : m.id)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-navy transition-colors"
                        title="Actions"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {activeKebabId === m.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveKebabId(null)}
                          />
                          <div className="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg animate-in fade-in zoom-in-95 duration-100">
                            <button
                              onClick={() => {
                                setActiveKebabId(null);
                                startEdit(m);
                              }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                              <span>Edit Member</span>
                            </button>
                            <button
                              onClick={() => {
                                setActiveKebabId(null);
                                promptDelete(m);
                              }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Remove</span>
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

      {/* Styled Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Remove Team Member?"
        message={memberToDelete ? `Are you sure you want to remove ${memberToDelete.name} from the team roster?` : ""}
        confirmLabel="Remove Member"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}
