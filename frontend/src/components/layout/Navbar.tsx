"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Moon, Sun, Shield } from "lucide-react";
import { useCartStore, useThemeStore, useAuthStore } from "@/store";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/academy", label: "Academy" },
  { href: "/premium", label: "Premium" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const { dark, toggle } = useThemeStore();
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === "admin" || user?.role === "ADMIN";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-semibold tracking-tight gradient-text">
            CrackNCode
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {isAdmin && (
              <Link href="/admin" className="p-2 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors text-brand-500 dark:text-brand-400">
                <Shield size={18} />
              </Link>
            )}

            <button onClick={toggle} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-400">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link href="/cart" className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-400">
              <ShoppingCart size={18} />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-brand-500 rounded-full text-[10px] flex items-center justify-center text-white font-medium">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              isAdmin ? null : (
                <Link href="/dashboard" className="hidden md:inline-flex ml-2 btn-primary text-sm px-4 py-2">
                  Dashboard
                </Link>
              )
            ) : (
              <Link href="/auth/login" className="hidden md:inline-flex ml-2 btn-primary text-sm px-4 py-2">
                Sign In
              </Link>
            )}

            <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden border-t border-zinc-200/50 dark:border-white/[0.06] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm text-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm text-brand-500 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10">
                  ⚡ Admin Panel
                </Link>
              )}
              <div className="pt-2">
                {user ? (
                  isAdmin ? null : (
                    <Link href="/dashboard" onClick={() => setOpen(false)} className="block text-center btn-primary text-sm py-2.5">Dashboard</Link>
                  )
                ) : (
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="block text-center btn-primary text-sm py-2.5">Sign In</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
