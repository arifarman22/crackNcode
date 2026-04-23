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

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string | null;
  duration: string;
  level: string;
  modules: number;
}

const emptyForm = { title: "", description: "", price: 0, image: "", duration: "", level: "beginner", modules: 0 };

export default function AdminCoursesPage() {
  const { data, loading, error, refetch } = useAdminData<Course[]>("/courses");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState("");
  const [saving, setSaving] = useState(false);

  const input = "w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all";

  const openCreate = () => { setForm(emptyForm); setModal("create"); };
  const openEdit = (c: Course) => {
    setForm({ title: c.title, description: c.description, price: c.price, image: c.image || "", duration: c.duration, level: c.level, modules: c.modules });
    setEditId(c.id);
    setModal("edit");
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.duration || form.price <= 0) {
      toast.error("Please fill all required fields"); return;
    }
    setSaving(true);
    try {
      const body = JSON.stringify({ ...form, price: Number(form.price), modules: Number(form.modules) });
      if (modal === "create") {
        await api("/courses", { method: "POST", body });
        toast.success("Course created");
      } else {
        await api(`/courses/${editId}`, { method: "PUT", body });
        toast.success("Course updated");
      }
      setModal(null);
      refetch();
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    try {
      await api(`/courses/${id}`, { method: "DELETE" });
      toast.success("Course deleted");
      refetch();
    } catch (e: any) { toast.error(e.message); }
  };

  const courses = Array.isArray(data) ? data : (data as any)?.data || [];
  const levelColor = (l: string) => l === "beginner" ? "text-emerald-500" : l === "intermediate" ? "text-amber-500" : "text-rose-500";

  const columns = [
    { key: "title", label: "Title" },
    { key: "level", label: "Level", render: (c: Course) => <span className={`capitalize text-xs font-medium ${levelColor(c.level)}`}>{c.level}</span> },
    { key: "duration", label: "Duration" },
    { key: "modules", label: "Modules" },
    { key: "price", label: "Price", render: (c: Course) => <span className="font-medium gradient-text">{formatPrice(c.price)}</span> },
    {
      key: "actions", label: "Actions",
      render: (c: Course) => (
        <div className="flex gap-1">
          <button onClick={() => openEdit(c)} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"><Pencil size={15} /></button>
          <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <>
      <AnimatedSection>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Manage <span className="gradient-text">Courses</span></h1>
          <Button size="sm" onClick={openCreate}><Plus size={16} /> Add Course</Button>
        </div>
      </AnimatedSection>

      <AdminTable columns={columns} data={courses} loading={loading} error={error} onRetry={refetch} />

      <AdminModal open={!!modal} onClose={() => setModal(null)} title={modal === "create" ? "Add New Course" : "Edit Course"}>
        <div className="space-y-5">
          <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Course Title *</label>
            <input type="text" placeholder="e.g. Web Development Bootcamp" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={input} />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Description *</label>
            <textarea placeholder="What students will learn..." rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${input} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Price ($) *</label>
              <input type="number" placeholder="79" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className={input} />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Duration *</label>
              <input type="text" placeholder="e.g. 12 weeks" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className={input} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Level</label>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className={input}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Modules</label>
              <input type="number" placeholder="24" value={form.modules || ""} onChange={(e) => setForm({ ...form, modules: parseInt(e.target.value) || 0 })} className={input} />
            </div>
          </div>
          <Button onClick={handleSave} className="w-full" disabled={saving}>
            {saving ? "Saving..." : modal === "create" ? "Create Course" : "Update Course"}
          </Button>
        </div>
      </AdminModal>
    </>
  );
}
