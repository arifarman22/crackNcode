"use client";
import { useState } from "react";
import { useAdminData } from "@/hooks/useAdminData";
import AdminTable from "@/components/ui/AdminTable";
import AdminModal from "@/components/ui/AdminModal";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import StatCard from "@/components/ui/StatCard";
import { api, formatPrice } from "@/lib/utils";
import { Crown, Users, Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  highlighted: boolean;
}

interface Sub {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  user: { id: string; name: string; email: string };
  plan: { name: string; price: number };
}

const emptyPlan = { name: "", price: 0, interval: "monthly", features: "", highlighted: false };

export default function AdminSubscriptionsPage() {
  const { data: plans, loading: plansLoading, error: plansError, refetch: refetchPlans } = useAdminData<Plan[]>("/subscriptions/plans");
  const { data: subs, loading: subsLoading, error: subsError } = useAdminData<Sub[]>("/subscriptions/all");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState(emptyPlan);
  const [editId, setEditId] = useState("");
  const [saving, setSaving] = useState(false);

  const inputClass = "w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors";

  const openCreate = () => { setForm(emptyPlan); setModal("create"); };
  const openEdit = (p: Plan) => {
    setForm({ name: p.name, price: p.price, interval: p.interval, features: p.features.join("\n"), highlighted: p.highlighted });
    setEditId(p.id);
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = JSON.stringify({
        name: form.name, price: Number(form.price), interval: form.interval, highlighted: form.highlighted,
        features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
      });
      if (modal === "create") {
        await api("/subscriptions/plans", { method: "POST", body });
        toast.success("Plan created");
      } else {
        await api(`/subscriptions/plans/${editId}`, { method: "PUT", body });
        toast.success("Plan updated");
      }
      setModal(null);
      refetchPlans();
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this plan?")) return;
    try {
      await api(`/subscriptions/plans/${id}`, { method: "DELETE" });
      toast.success("Plan deleted");
      refetchPlans();
    } catch (e: any) { toast.error(e.message); }
  };

  const statusClass = (s: string) =>
    s === "ACTIVE" ? "bg-green-500/10 text-green-400" :
    s === "CANCELLED" ? "bg-red-500/10 text-red-400" :
    "bg-yellow-500/10 text-yellow-400";

  const planColumns = [
    { key: "name", label: "Plan" },
    { key: "price", label: "Price", render: (p: Plan) => <span className="gradient-text font-medium">{formatPrice(p.price)}/{p.interval}</span> },
    { key: "features", label: "Features", render: (p: Plan) => <span className="text-gray-400">{p.features.length} features</span> },
    { key: "highlighted", label: "Popular", render: (p: Plan) => p.highlighted ? <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400">Yes</span> : <span className="text-gray-600">No</span> },
    {
      key: "actions", label: "Actions",
      render: (p: Plan) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><Pencil size={15} /></button>
          <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"><Trash2 size={15} /></button>
        </div>
      ),
    },
  ];

  const subColumns = [
    { key: "user", label: "User", render: (s: Sub) => <div><div className="font-medium text-sm">{s.user.name}</div><div className="text-xs text-gray-500">{s.user.email}</div></div> },
    { key: "plan", label: "Plan", render: (s: Sub) => <span>{s.plan.name} — {formatPrice(s.plan.price)}</span> },
    { key: "status", label: "Status", render: (s: Sub) => <span className={`text-xs px-2 py-1 rounded-full ${statusClass(s.status)}`}>{s.status}</span> },
    { key: "startDate", label: "Start", render: (s: Sub) => <span className="text-gray-400 text-xs">{new Date(s.startDate).toLocaleDateString()}</span> },
    { key: "endDate", label: "Expires", render: (s: Sub) => <span className="text-gray-400 text-xs">{new Date(s.endDate).toLocaleDateString()}</span> },
  ];

  return (
    <>
      <AnimatedSection>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Manage <span className="gradient-text">Subscriptions</span></h1>
          <Button size="sm" onClick={openCreate}><Plus size={16} /> Add Plan</Button>
        </div>
      </AnimatedSection>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Plans" value={plans?.length || 0} icon={Crown} color="from-brand-500 to-purple-400" />
        <StatCard label="Active Subs" value={subs?.filter((s) => s.status === "ACTIVE").length || 0} icon={Users} color="from-green-500 to-emerald-400" />
        <StatCard label="Total Subs" value={subs?.length || 0} icon={Users} color="from-blue-500 to-cyan-400" />
      </div>

      {/* Plans Table */}
      <AnimatedSection delay={0.1} className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Plans</h2>
        {plansError ? <div className="card-glass p-4 text-red-400 text-sm">{plansError}</div> :
          <AdminTable columns={planColumns} data={plans || []} loading={plansLoading} />}
      </AnimatedSection>

      {/* Subscribers Table */}
      <AnimatedSection delay={0.2}>
        <h2 className="text-lg font-semibold mb-4">Subscribers</h2>
        {subsError ? <div className="card-glass p-4 text-red-400 text-sm">{subsError}</div> :
          <AdminTable columns={subColumns} data={subs || []} loading={subsLoading} />}
      </AnimatedSection>

      {/* Plan Modal */}
      <AdminModal open={!!modal} onClose={() => setModal(null)} title={modal === "create" ? "Add Plan" : "Edit Plan"}>
        <div className="space-y-4">
          <input type="text" placeholder="Plan Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className={inputClass} />
            <select value={form.interval} onChange={(e) => setForm({ ...form, interval: e.target.value })} className={inputClass}>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <textarea placeholder="Features (one per line)" rows={4} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className={`${inputClass} resize-none`} />
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input type="checkbox" checked={form.highlighted} onChange={(e) => setForm({ ...form, highlighted: e.target.checked })} className="accent-purple-500" />
            Mark as popular/highlighted
          </label>
          <Button onClick={handleSave} className="w-full" disabled={saving}>
            {saving ? "Saving..." : modal === "create" ? "Create Plan" : "Update Plan"}
          </Button>
        </div>
      </AdminModal>
    </>
  );
}
