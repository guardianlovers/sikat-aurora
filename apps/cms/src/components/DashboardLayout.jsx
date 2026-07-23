import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Image,
  FolderOpen,
  Users,
  UserCheck,
  Trophy,
  Globe,
  Home,
  Info,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight
} from "lucide-react";

const NAV_GROUPS = [
  {
    title: "EDIT WEBSITE PAGES",
    items: [
      { label: "Home Page", path: "/site-content?page=home", icon: Home, adminOnly: true },
      { label: "About Page", path: "/site-content?page=about", icon: Info, adminOnly: true },
      { label: "Programs Page", path: "/site-content?page=programs", icon: BookOpen, adminOnly: true },
      { label: "Impact Page", path: "/awards", icon: Trophy, adminOnly: true },
      { label: "The Team Page", path: "/team", icon: UserCheck, adminOnly: true },
      { label: "Blog & Stories", path: "/posts", icon: FileText },
    ],
  },
  {
    title: "ASSETS & USERS",
    items: [
      { label: "Media Library", path: "/media", icon: Image },
      { label: "Blog Categories", path: "/categories", icon: FolderOpen, adminOnly: true },
      { label: "User Accounts", path: "/users", icon: Users, adminOnly: true },
      { label: "My Profile", path: "/profile", icon: User },
    ],
  },
];

export default function DashboardLayout() {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleBadge = {
    writer: "bg-blue-100 text-blue-700 border-blue-200",
    editor: "bg-amber-100 text-amber-700 border-amber-200",
    admin: "bg-purple-100 text-purple-700 border-purple-200",
  };

  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get("page");

  function getBreadcrumb() {
    if (location.pathname === "/site-content") {
      if (pageParam === "home") return ["Edit Website Pages", "Home Page"];
      if (pageParam === "about") return ["Edit Website Pages", "About Page"];
      if (pageParam === "programs") return ["Edit Website Pages", "Programs Page"];
      return ["Edit Website Pages", "Site Content"];
    }
    if (location.pathname === "/team") return ["Edit Website Pages", "The Team Page"];
    if (location.pathname === "/awards") return ["Edit Website Pages", "Impact Page"];
    if (location.pathname === "/posts") return ["Edit Website Pages", "Blog & Stories"];
    if (location.pathname === "/media") return ["Assets & Users", "Media Library"];
    if (location.pathname === "/categories") return ["Assets & Users", "Blog Categories"];
    if (location.pathname === "/users") return ["Assets & Users", "User Accounts"];
    if (location.pathname === "/profile") return ["Assets & Users", "My Profile"];
    return [location.pathname.replace("/", "").replace("-", " ")];
  }

  const breadcrumbParts = getBreadcrumb();

  return (
    <div className="flex min-h-screen bg-gray-50/60 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 bg-white shadow-sm transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header Logo */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <Link to="/posts" className="flex items-center gap-2.5 no-underline">
              <img src="/logo.png" alt="Síkat-Aurora Logo" className="h-8 w-8 object-contain" />
              <div>
                <span className="font-display text-base font-semibold tracking-tight text-navy">
                  Síkat<span className="text-primary">-CMS</span>
                </span>
                <span className="block text-[0.65rem] font-medium tracking-wider text-gray-400 uppercase">
                  Aurora Province
                </span>
              </div>
            </Link>
            <button
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Grouped Nav Items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {NAV_GROUPS.map((group) => {
              if (group.adminOnly && profile?.role !== "admin") return null;

              const visibleItems = group.items.filter(
                (item) => !item.adminOnly || profile?.role === "admin"
              );
              if (!visibleItems.length) return null;

              return (
                <div key={group.title} className="space-y-1">
                  <p className="px-3 text-[0.68rem] font-semibold tracking-wider text-gray-400 uppercase">
                    {group.title}
                  </p>
                  {visibleItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path.split("?")[0]) &&
                      (!item.path.includes("?") || location.search.includes(item.path.split("?")[1]));
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium no-underline transition-all duration-150 ${
                          isActive
                            ? "bg-navy text-white shadow-xs font-semibold"
                            : "text-gray-600 hover:bg-gray-100 hover:text-navy"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-gray-400 group-hover:text-navy"}`} />
                          <span>{item.label}</span>
                        </div>
                        {isActive && <ChevronRight className="h-3.5 w-3.5 text-white/60" />}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          {/* User Profile Footer Block */}
          <div className="border-t border-gray-100 p-3">
            <Link
              to="/profile"
              className="mb-2 flex items-center gap-3 rounded-xl p-2 no-underline transition-colors hover:bg-gray-50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white shadow-xs">
                {profile?.full_name?.[0]?.toUpperCase() || "V"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-gray-900">
                  {profile?.full_name || "Volunteer"}
                </p>
                <span
                  className={`inline-block rounded-full border px-2 py-0.2 text-[0.65rem] font-medium capitalize ${
                    roleBadge[profile?.role] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {profile?.role || "writer"}
                </span>
              </div>
            </Link>
            <button
              onClick={signOut}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Dynamic Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-gray-500">
              <span className="text-gray-400 font-normal">Síkat-Aurora CMS</span>
              {breadcrumbParts.map((part, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-gray-300">/</span>
                  <span className={i === breadcrumbParts.length - 1 ? "font-semibold text-gray-900" : "text-gray-500"}>
                    {part}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-2xs transition-all hover:bg-gray-50 hover:border-gray-300 no-underline"
            >
              <ExternalLink className="h-3.5 w-3.5 text-primary" />
              <span className="hidden sm:inline">View Public Website</span>
            </a>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
