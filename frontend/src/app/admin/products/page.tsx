"use client";
import { useState } from "react";
import { useAdminData } from "@/hooks/useAdminData";
import AdminTable from "@/components/ui/AdminTable";
import AdminModal from "@/components/ui/AdminModal";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/ui/ImageUpload";
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

  const input = "w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all";

  const openCreate = () => { setForm(emptyForm); setModal("create"); };
  const openEdit = (p: Product) => {
    setForm({ name: p.name, description: p.description, price: p.price, category: p.category, type: p.type, image: p.image || "" });
    setEditId(p.id);
    setModal("edit");
  };

  const handleSave = async () => {
    if (!form.name || !form.description || !form.category || form.price <= 0) {
      toast.error("Please fill all required fields"); return;
    }
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

  const products = Array.isArray(data) ? data : (data as any)?.data || [];

  const columns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category", render: (p: Product) => <span className="capitalize">{p.category}</span> },
    { key: "type", label: "Type", render: (p: Product) => <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{p.type}</span> },
    { key: "price", label: "Price", render: (p: Product) => <span className="font-medium gradient-text">{formatPrice(p.price)}</span> },
    {
      key: "actions", label: "Actions",
      render: (p: Product) => (
        <div className="flex gap-1">
          <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"><Pencil size={15} /></button>
          <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
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

      <AdminTable columns={columns} data={products} loading={loading} error={error} onRetry={refetch} />

      <AdminModal open={!!modal} onClose={() => setModal(null)} title={modal === "create" ? "Add New Product" : "Edit Product"}>
        <div className="space-y-5">
          <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Product Name *</label>
            <input type="text" placeholder="e.g. SEO Mastery Toolkit" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Description *</label>
            <textarea placeholder="Describe the product..." rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${input} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Price ($) *</label>
              <input type="number" placeholder="29.99" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className={input} />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Category *</label>
              <input type="text" placeholder="e.g. marketing" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={input} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Product Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={input}>
              <option value="DIGITAL">Digital</option>
              <option value="PACKAGE">Package</option>
            </select>
          </div>
          <Button onClick={handleSave} className="w-full" disabled={saving}>
            {saving ? "Saving..." : modal === "create" ? "Create Product" : "Update Product"}
          </Button>
        </div>
      </AdminModal>
    </>
  );
}
