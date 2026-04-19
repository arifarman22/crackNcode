"use client";
import { useAdminData } from "@/hooks/useAdminData";
import StatCard from "@/components/ui/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Users, Package, ShoppingCart, DollarSign, Crown, TrendingUp } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { formatPrice } from "@/lib/utils";

interface Stats {
  users: number;
  products: number;
  orders: number;
  revenue: number;
  activeSubscriptions: number;
  recentOrders: { id: string; total: number; status: string; createdAt: string; user: { name: string; email: string } }[];
  recentUsers: { id: string; name: string; email: string; role: string; createdAt: string }[];
}

interface ChartData {
  revenueChart: { month: string; revenue: number }[];
  ordersChart: { month: string; orders: number }[];
  usersByRole: { name: string; value: number }[];
  ordersByStatus: { name: string; value: number }[];
  productsByCategory: { name: string; value: number }[];
}

const COLORS = ["#6b00ff", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
const STATUS_COLORS: Record<string, string> = {
  Pending: "#f59e0b", Paid: "#3b82f6", Completed: "#10b981", Cancelled: "#ef4444",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-dark-card border border-white/10 rounded-xl px-3 py-2 shadow-lg">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-sm font-medium" style={{ color: p.color }}>
          {p.name}: {p.name === "revenue" ? formatPrice(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const { data: stats, loading: statsLoading } = useAdminData<Stats>("/admin/stats");
  const { data: charts, loading: chartsLoading } = useAdminData<ChartData>("/admin/charts");

  return (
    <>
      <AnimatedSection>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin <span className="gradient-text">Dashboard</span></h1>
            <p className="text-sm text-gray-500 mt-1">Overview of your platform performance</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <TrendingUp size={14} className="text-green-400" />
            Live Data
          </div>
        </div>
      </AnimatedSection>

      {/* Stat Cards */}
      {statsLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="card-glass h-24 animate-pulse" />)}
        </div>
      ) : stats ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          <AnimatedSection delay={0}><StatCard label="Total Users" value={stats.users} icon={Users} color="from-blue-500 to-cyan-400" /></AnimatedSection>
          <AnimatedSection delay={0.05}><StatCard label="Products" value={stats.products} icon={Package} color="from-brand-500 to-purple-400" /></AnimatedSection>
          <AnimatedSection delay={0.1}><StatCard label="Orders" value={stats.orders} icon={ShoppingCart} color="from-orange-500 to-yellow-400" /></AnimatedSection>
          <AnimatedSection delay={0.15}><StatCard label="Revenue" value={formatPrice(stats.revenue)} icon={DollarSign} color="from-green-500 to-emerald-400" /></AnimatedSection>
          <AnimatedSection delay={0.2}><StatCard label="Subscriptions" value={stats.activeSubscriptions} icon={Crown} color="from-pink-500 to-rose-400" /></AnimatedSection>
        </div>
      ) : null}

      {/* Charts Row 1: Revenue + Orders */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <AnimatedSection delay={0.25}>
          <GlassCard hover={false}>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Revenue (Last 6 Months)</h3>
            <div className="h-64">
              {chartsLoading ? (
                <div className="h-full flex items-center justify-center text-gray-600 animate-pulse">Loading chart...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={charts?.revenueChart || []}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6b00ff" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6b00ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" stroke="#6b00ff" fill="url(#revGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <GlassCard hover={false}>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Orders (Last 6 Months)</h3>
            <div className="h-64">
              {chartsLoading ? (
                <div className="h-full flex items-center justify-center text-gray-600 animate-pulse">Loading chart...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts?.ordersChart || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="orders" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>

      {/* Charts Row 2: Pie Charts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <AnimatedSection delay={0.35}>
          <GlassCard hover={false}>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Orders by Status</h3>
            <div className="h-52">
              {!chartsLoading && charts?.ordersByStatus && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={charts.ordersByStatus} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4} dataKey="value">
                      {charts.ordersByStatus.map((entry, i) => (
                        <Cell key={i} fill={STATUS_COLORS[entry.name] || COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <GlassCard hover={false}>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Users by Role</h3>
            <div className="h-52">
              {!chartsLoading && charts?.usersByRole && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={charts.usersByRole} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4} dataKey="value">
                      {charts.usersByRole.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={0.45}>
          <GlassCard hover={false}>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Products by Category</h3>
            <div className="h-52">
              {!chartsLoading && charts?.productsByCategory && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={charts.productsByCategory} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4} dataKey="value">
                      {charts.productsByCategory.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <AnimatedSection delay={0.5}>
          <GlassCard hover={false}>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Recent Orders</h3>
            {stats?.recentOrders?.length ? (
              <div className="space-y-3">
                {stats.recentOrders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <div>
                      <p className="text-sm font-medium">{o.user.name}</p>
                      <p className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium gradient-text">{formatPrice(o.total)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        o.status === "COMPLETED" ? "bg-green-500/10 text-green-400" :
                        o.status === "PAID" ? "bg-blue-500/10 text-blue-400" :
                        "bg-yellow-500/10 text-yellow-400"
                      }`}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No orders yet</p>
            )}
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={0.55}>
          <GlassCard hover={false}>
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Recent Users</h3>
            {stats?.recentUsers?.length ? (
              <div className="space-y-3">
                {stats.recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-xs text-white font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      u.role === "ADMIN" ? "bg-brand-500/20 text-brand-400" : "bg-white/10 text-gray-400"
                    }`}>{u.role}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No users yet</p>
            )}
          </GlassCard>
        </AnimatedSection>
      </div>
    </>
  );
}
