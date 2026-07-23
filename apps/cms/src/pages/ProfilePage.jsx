import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { User, Key, Save, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react";

export default function ProfilePage() {
  const { user, profile } = useAuth();

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [error, setError] = useState(null);

  async function handleUpdateProfile(e) {
    e.preventDefault();
    if (!fullName.trim()) return;

    setSavingProfile(true);
    setProfileMsg(null);
    setError(null);

    try {
      if (!supabase) throw new Error("Supabase is not configured.");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ full_name: fullName.trim(), updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (updateError) throw updateError;
      setProfileMsg("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    if (!password) return;
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSavingPassword(true);
    setPasswordMsg(null);
    setError(null);

    try {
      if (!supabase) throw new Error("Supabase is not configured.");

      const { error: pwdError } = await supabase.auth.updateUser({
        password,
      });

      if (pwdError) throw pwdError;

      setPassword("");
      setConfirmPassword("");
      setPasswordMsg("Password changed successfully!");
    } catch (err) {
      setError(err.message || "Failed to change password.");
    } finally {
      setSavingPassword(false);
    }
  }

  const roleBadge = {
    writer: "bg-blue-100 text-blue-700 border-blue-200",
    editor: "bg-amber-100 text-amber-700 border-amber-200",
    admin: "bg-purple-100 text-purple-700 border-purple-200",
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Account Profile</h1>
        <p className="text-sm text-gray-500">
          Manage your account credentials, full name, and security settings.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* User Info Header Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-2xl font-bold text-white shadow-md">
          {profile?.full_name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{profile?.full_name || "Volunteer"}</h2>
          <p className="text-xs text-gray-500">{user?.email}</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold capitalize ${
                roleBadge[profile?.role] || "bg-gray-100 text-gray-600 border-gray-200"
              }`}
            >
              {profile?.role || "writer"}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Details Form */}
      <form
        onSubmit={handleUpdateProfile}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4"
      >
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <User className="h-4 w-4 text-primary" /> Personal Information
        </h2>

        {profileMsg && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-700 border border-emerald-200">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>{profileMsg}</span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Email Address (Read-only)</label>
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm text-gray-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingProfile}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {savingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Profile
          </button>
        </div>
      </form>

      {/* Change Password Form */}
      <form
        onSubmit={handleChangePassword}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4"
      >
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Key className="h-4 w-4 text-navy" /> Change Password
        </h2>

        {passwordMsg && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-700 border border-emerald-200">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>{passwordMsg}</span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingPassword || !password}
            className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-deep disabled:opacity-50"
          >
            {savingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <Key className="h-4 w-4" />}
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
