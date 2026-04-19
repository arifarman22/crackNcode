"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store";
import { useHydrated } from "@/hooks/useHydrated";
import {
  LayoutDashboard, Users, Package, Briefcase, GraduationCap,
  ShoppingCart, Crown, ChevronLeft, ChevronRight, LogOut, Home, Menu, X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/courses", label: "Courses", icon: GraduationCap },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: Crown },
];

const isAdminRole = (role?: string) => role === "ADMIN" || role === "admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!user || !isAdminRole(user.role)) router.push("/auth/login");
  }, [hydrated, user, router]);

  // Close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  if (!hydrated) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading admin panel...</div></div>;
  }
  if (!user || !isAdminRole(user.role)) return null;

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        {!collapsed && <span className="text-sm font-bold gradient-text">Admin Panel</span>}
        {/* Desktop collapse toggle */}
        <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:block p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-auto">
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        {/* Mobile close */}
        <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-auto">
          <X size={16} />
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active ? "bg-brand-500/20 text-brand-400 font-medium" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="shrink-0" />
              {(!collapsed || mobileOpen) && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-white/10 space-y-1">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all">
          <Home size={18} className="shrink-0" />
          {(!collapsed || mobileOpen) && <span>Back to Site</span>}
        </Link>
        <button
          onClick={() => { logout(); window.location.href = "/"; }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut size={18} className="shrink-0" />
          {(!collapsed || mobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen -mt-16 pt-16">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-[4.5rem] left-4 z-50 p-2 rounded-xl bg-surface-dark-card border border-white/10 hover:bg-white/10 transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={`lg:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] z-50 w-60 bg-surface-dark-card border-r border-white/10 flex flex-col transition-transform duration-300 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex fixed top-16 left-0 h-[calc(100vh-4rem)] z-40 bg-surface-dark-card border-r border-white/10 transition-all duration-300 flex-col ${
        collapsed ? "w-16" : "w-60"
      }`}>
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? "lg:ml-16" : "lg:ml-60"} ml-0`}>
        <div className="p-4 sm:p-6 max-w-7xl mx-auto pt-14 lg:pt-6">{children}</div>
      </main>
    </div>
  );
}
