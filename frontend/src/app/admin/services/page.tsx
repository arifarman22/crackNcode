"use client";
import { useState } from "react";
import { useAdminData } from "@/hooks/useAdminData";
import AdminTable from "@/components/ui/AdminTable";
import AdminModal from "@/components/ui/AdminModal";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { api, formatPrice } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  tier: string;
}

const emptyForm = { title: "", description: "", price: 0, tier: "starter", features: "" };

export default function AdminServicesPage() {
  const { data, loading, error, refetch } = useAdminData<Service[]>("/services");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState("");
  const [saving, setSaving] = useState(false);

  const input = "w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all";

  const openCreate = () => { setForm(emptyForm); setModal("create"); };
  const openEdit = (s: Service) => {
    setForm({ title: s.title, description: s.description, price: s.price, tier: s.tier, features: s.features.join("\n") });
    setEditId(s.id);
    setModal("edit");
  };

  const handleSave = async () => {
    if (!form.title || !form.description || form.price <= 0) {
      toast.error("Please fill all required fields"); return;
    }
    setSaving(true);
    try {
      const body = JSON.stringify({
        title: form.title, description: form.description, price: Number(form.price), tier: form.tier,
        features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
      });
      if (modal === "create") {
        await api("/services", { method: "POST", body });
        toast.success("Service created");
      } else {
        await api(`/services/${editId}`, { method: "PUT", body });
        toast.success("Service updated");
      }
      setModal(null);
      refetch();
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await api(`/services/${id}`, { method: "DELETE" });
      toast.success("Service deleted");
      refetch();
    } catch (e: any) { toast.error(e.message); }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "tier", label: "Tier", render: (s: Service) => <span className="capitalize text-xs px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium">{s.tier}</span> },
    { key: "price", label: "Price", render: (s: Service) => <span className="font-medium gradient-text">{formatPrice(s.price)}</span> },
    { key: "features", label: "Features", render: (s: Service) => <span className="text-zinc-500">{s.features.length} features</span> },
    {
      key: "actions", label: "Actions",
      render: (s: Service) => (
        <div className="flex gap-1">
          <button onClick={() => openEdit(s)} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"><Pencil size={15} /></button>
          <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <>
      <AnimatedSection>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Manage <span className="gradient-text">Services</span></h1>
          <Button size="sm" onClick={openCreate}><Plus size={16} /> Add Service</Button>
        </div>
      </AnimatedSection>

      <AdminTable columns={columns} data={data || []} loading={loading} error={error} onRetry={refetch} />

      <AdminModal open={!!modal} onClose={() => setModal(null)} title={modal === "create" ? "Add New Service" : "Edit Service"}>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Service Title *</label>
            <input type="text" placeholder="e.g. Professional" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={input} />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Description *</label>
            <textarea placeholder="What's included in this service..." rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${input} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Price ($) *</label>
              <input type="number" placeholder="299" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className={input} />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Tier</label>
              <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className={input}>
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Features (one per line) *</label>
            <textarea placeholder={"5 Pages Website\nAdvanced SEO\nCustom Animations\nPriority Support"} rows={5} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className={`${input} resize-none`} />
          </div>
          <Button onClick={handleSave} className="w-full" disabled={saving}>
            {saving ? "Saving..." : modal === "create" ? "Create Service" : "Update Service"}
          </Button>
        </div>
      </AdminModal>
    </>
  );
}
