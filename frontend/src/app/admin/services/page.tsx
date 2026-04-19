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

  const inputClass = "w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors";

  const openCreate = () => { setForm(emptyForm); setModal("create"); };
  const openEdit = (s: Service) => {
    setForm({ title: s.title, description: s.description, price: s.price, tier: s.tier, features: s.features.join("\n") });
    setEditId(s.id);
    setModal("edit");
  };

  const handleSave = async () => {
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
    { key: "tier", label: "Tier", render: (s: Service) => <span className="capitalize text-xs px-2 py-1 rounded-full bg-brand-500/20 text-brand-400">{s.tier}</span> },
    { key: "price", label: "Price", render: (s: Service) => <span className="font-medium gradient-text">{formatPrice(s.price)}</span> },
    { key: "features", label: "Features", render: (s: Service) => <span className="text-gray-400">{s.features.length} features</span> },
    {
      key: "actions", label: "Actions",
      render: (s: Service) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(s)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><Pencil size={15} /></button>
          <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"><Trash2 size={15} /></button>
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

      <AdminModal open={!!modal} onClose={() => setModal(null)} title={modal === "create" ? "Add Service" : "Edit Service"}>
        <div className="space-y-4">
          <input type="text" placeholder="Service Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
          <textarea placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className={inputClass} />
            <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className={inputClass}>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <textarea placeholder="Features (one per line)" rows={4} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className={`${inputClass} resize-none`} />
          <Button onClick={handleSave} className="w-full" disabled={saving}>
            {saving ? "Saving..." : modal === "create" ? "Create Service" : "Update Service"}
          </Button>
        </div>
      </AdminModal>
    </>
  );
}
