import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Protects routes from unauthorized access.
 * Redirects to /login if not authenticated.
 * Optionally checks for specific roles.
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { session, profile, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!profile || !profile.is_active) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-navy">
            {!profile ? "Profile Not Initialized" : "Account Inactive"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {!profile
              ? "Your user account exists in Supabase Auth, but your admin profile row hasn't been created in the database yet."
              : "Your account is currently inactive. Please contact an administrator."}
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={signOut}
              className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
            >
              Sign Out &amp; Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (requiredRole && profile.role !== requiredRole) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-navy">Access Denied</h1>
          <p className="mt-2 text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
