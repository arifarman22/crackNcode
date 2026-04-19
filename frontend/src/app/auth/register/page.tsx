"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { api } from "@/lib/utils";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name || form.name.length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(form.password)) e.password = "Must contain uppercase and number";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api<{ user: any; token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      setAuth(res.user, res.token);
      toast.success("Account created!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-2xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none transition-colors ${
      errors[field] ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-brand-400/50"
    }`;

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <AnimatedSection className="w-full max-w-md">
        <GlassCard hover={false}>
          <h1 className="text-2xl font-bold text-center mb-2">
            Join <span className="gradient-text">CrackNCode</span>
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">Create your account to get started</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }} className={inputClass("name")} />
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
            </div>
            <div>
              <input type="email" placeholder="Email" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }} className={inputClass("email")} />
              {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
            </div>
            <div className="relative">
              <input type={showPw ? "text" : "password"} placeholder="Password" value={form.password} onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: "" }); }} className={inputClass("password")} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>}
            </div>
            <div>
              <input type="password" placeholder="Confirm Password" value={form.confirm} onChange={(e) => { setForm({ ...form, confirm: e.target.value }); setErrors({ ...errors, confirm: "" }); }} className={inputClass("confirm")} />
              {errors.confirm && <p className="text-red-400 text-xs mt-1 ml-1">{errors.confirm}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-brand-400 hover:underline">Sign In</Link>
          </p>
        </GlassCard>
      </AnimatedSection>
    </section>
  );
}
