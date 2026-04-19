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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold gradient-text">
            CrackNCode
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-gray-300 hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gradient group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link href="/admin" className="p-2 rounded-xl hover:bg-brand-500/10 transition-colors text-brand-400" title="Admin Panel">
                <Shield size={18} />
              </Link>
            )}

            <button onClick={toggle} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link href="/cart" className="relative p-2 rounded-xl hover:bg-white/10 transition-colors">
              <ShoppingCart size={18} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 rounded-full text-xs flex items-center justify-center text-white">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              isAdmin ? null : (
                <Link href="/dashboard" className="hidden md:inline-flex btn-primary text-sm px-4 py-2">
                  Dashboard
                </Link>
              )
            ) : (
              <Link href="/auth/login" className="hidden md:inline-flex btn-primary text-sm px-4 py-2">
                Sign In
              </Link>
            )}

            <button onClick={() => setOpen(!open)} className="md:hidden p-2">
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
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 rounded-xl text-brand-400 hover:bg-brand-500/10 transition-colors"
                >
                  ⚡ Admin Panel
                </Link>
              )}
              {user ? (
                isAdmin ? null : (
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 rounded-xl bg-brand-gradient text-white text-center"
                  >
                    Dashboard
                  </Link>
                )
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 rounded-xl bg-brand-gradient text-white text-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
