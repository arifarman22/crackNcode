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

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category: string;
  type: string;
}

const emptyForm = { name: "", description: "", price: 0, category: "", type: "DIGITAL", image: "" };

export default function AdminProductsPage() {
  const { data, loading, error, refetch } = useAdminData<Product[]>("/products");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState("");
  const [saving, setSaving] = useState(false);

  const inputClass = "w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors";

  const openCreate = () => { setForm(emptyForm); setModal("create"); };
  const openEdit = (p: Product) => {
    setForm({ name: p.name, description: p.description, price: p.price, category: p.category, type: p.type, image: p.image || "" });
    setEditId(p.id);
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = JSON.stringify({ ...form, price: Number(form.price) });
      if (modal === "create") {
        await api("/products", { method: "POST", body });
        toast.success("Product created");
      } else {
        await api(`/products/${editId}`, { method: "PUT", body });
        toast.success("Product updated");
      }
      setModal(null);
      refetch();
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api(`/products/${id}`, { method: "DELETE" });
      toast.success("Product deleted");
      refetch();
    } catch (e: any) { toast.error(e.message); }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category", render: (p: Product) => <span className="capitalize">{p.category}</span> },
    { key: "type", label: "Type", render: (p: Product) => <span className="text-xs px-2 py-1 rounded-full bg-white/10">{p.type}</span> },
    { key: "price", label: "Price", render: (p: Product) => <span className="font-medium gradient-text">{formatPrice(p.price)}</span> },
    {
      key: "actions", label: "Actions",
      render: (p: Product) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><Pencil size={15} /></button>
          <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"><Trash2 size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <>
      <AnimatedSection>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Manage <span className="gradient-text">Products</span></h1>
          <Button size="sm" onClick={openCreate}><Plus size={16} /> Add Product</Button>
        </div>
      </AnimatedSection>

      <AdminTable columns={columns} data={data || []} loading={loading} error={error} onRetry={refetch} />

      <AdminModal open={!!modal} onClose={() => setModal(null)} title={modal === "create" ? "Add Product" : "Edit Product"}>
        <div className="space-y-4">
          <input type="text" placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className={inputClass} />
            <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass} />
          </div>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass}>
            <option value="DIGITAL">Digital</option>
            <option value="PACKAGE">Package</option>
          </select>
          <input type="text" placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} />
          <Button onClick={handleSave} className="w-full" disabled={saving}>
            {saving ? "Saving..." : modal === "create" ? "Create Product" : "Update Product"}
          </Button>
        </div>
      </AdminModal>
    </>
  );
}
