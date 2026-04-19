"use client";
import { useAuthStore } from "@/store";
import { useHydrated } from "@/hooks/useHydrated";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Package, CreditCard, LogOut, ShoppingBag, AlertCircle, RefreshCw } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { api, formatPrice } from "@/lib/utils";

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: { id: string; quantity: number; price: number; product: { name: string } }[];
}

interface Subscription {
  id: string;
  status: string;
  plan: { name: string; price: number; interval: string };
  endDate: string;
}

export default function DashboardPage() {
  const hydrated = useHydrated();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [ordersRes, subRes] = await Promise.allSettled([
        api<Order[]>("/orders/my"),
        api<Subscription | null>("/subscriptions/my"),
      ]);
      if (ordersRes.status === "fulfilled") setOrders(ordersRes.value || []);
      else setError(ordersRes.reason?.message || "Failed to load orders");
      if (subRes.status === "fulfilled") setSubscription(subRes.value);
    } catch (e: any) {
      setError(e.message || "Failed to connect to server");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) { router.push("/auth/login"); return; }
    fetchData();
  }, [hydrated, user, router, fetchData]);

  if (!hydrated) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading...</div></div>;
  if (!user) return null;

  const statusClass = (s: string) =>
    s === "COMPLETED" ? "bg-green-500/10 text-green-400" :
    s === "PAID" ? "bg-blue-500/10 text-blue-400" :
    s === "CANCELLED" ? "bg-red-500/10 text-red-400" :
    "bg-yellow-500/10 text-yellow-400";

  return (
    <section className="section-padding">
      <AnimatedSection>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">
            Welcome, <span className="gradient-text">{user.name}</span>
          </h1>
          <Button variant="ghost" size="sm" onClick={() => { logout(); window.location.href = "/"; }}>
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </AnimatedSection>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle size={18} className="text-red-400" />
            <span className="text-sm text-red-400">{error}</span>
          </div>
          <Button size="sm" variant="secondary" onClick={fetchData}><RefreshCw size={14} /> Retry</Button>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <AnimatedSection>
          <GlassCard className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center text-white text-lg font-semibold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-400">{user.email}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400">{user.role}</span>
            </div>
          </GlassCard>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <GlassCard className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-xl font-semibold">{loading ? "..." : orders.length}</p>
            </div>
          </GlassCard>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <GlassCard className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-purple-400 flex items-center justify-center">
              <CreditCard size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Subscription</p>
              <p className="text-xl font-semibold">{loading ? "..." : subscription?.plan?.name || "None"}</p>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.3}>
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Orders</h3>
            {!loading && <Button size="sm" variant="ghost" onClick={fetchData}><RefreshCw size={14} /></Button>}
          </div>
          {loading ? (
            <div className="py-8 text-center text-gray-500 animate-pulse">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="py-8 text-center">
              <ShoppingBag size={40} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 mb-3">No orders yet</p>
              <Button size="sm" onClick={() => router.push("/shop")}>Browse Shop</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="text-left py-3">Order ID</th>
                    <th className="text-left py-3">Items</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Date</th>
                    <th className="text-right py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-white/5">
                      <td className="py-3 text-gray-300 font-mono text-xs">{o.id.slice(0, 10)}...</td>
                      <td className="py-3">{o.items.map((item) => item.product.name).join(", ")}</td>
                      <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${statusClass(o.status)}`}>{o.status}</span></td>
                      <td className="py-3 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 text-right font-medium gradient-text">{formatPrice(o.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>
      </AnimatedSection>
    </section>
  );
}
