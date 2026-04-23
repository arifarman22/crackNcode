"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store";
import { api } from "@/lib/utils";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const setAuth = useAuthStore((s) => s.setAuth);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api<{ user: any; token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setAuth(res.user, res.token);
      toast.success("Welcome back!");
      window.location.href = res.user.role === "ADMIN" ? "/admin" : "/dashboard";
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all duration-300 ${
      errors[field] ? "border-red-400 focus:ring-red-500/20" : "border-zinc-200 dark:border-zinc-700 focus:border-brand-400"
    }`;

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <AnimatedSection className="w-full max-w-md">
        <GlassCard hover={false}>
          <h1 className="text-2xl font-semibold text-center mb-2">
            Sign In to <span className="gradient-text">CrackNCode</span>
          </h1>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-6">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                className={inputClass("email")}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: "" }); }}
                className={inputClass("password")}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-brand-600 dark:text-brand-400 hover:underline">Sign Up</Link>
          </p>
        </GlassCard>
      </AnimatedSection>
    </section>
  );
}
