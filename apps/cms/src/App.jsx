import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import PostsPage from "@/pages/PostsPage";
import PostEditorPage from "@/pages/PostEditorPage";
import MediaPage from "@/pages/MediaPage";
import CategoriesPage from "@/pages/CategoriesPage";
import UsersPage from "@/pages/UsersPage";
import TeamPage from "@/pages/TeamPage";
import AwardsPage from "@/pages/AwardsPage";
import ProfilePage from "@/pages/ProfilePage";
import SiteContentPage from "@/pages/SiteContentPage";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          {/* Public auth route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected CMS routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/new" element={<PostEditorPage />} />
          <Route path="/posts/:id/edit" element={<PostEditorPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Admin only routes */}
          <Route
            path="/site-content"
            element={
              <ProtectedRoute requiredRole="admin">
                <SiteContentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute requiredRole="admin">
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute requiredRole="admin">
                <TeamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/awards"
            element={
              <ProtectedRoute requiredRole="admin">
                <AwardsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <UsersPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
