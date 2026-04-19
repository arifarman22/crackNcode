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

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  modules: number;
}

const emptyForm = { title: "", description: "", price: 0, duration: "", level: "beginner", modules: 0 };

export default function AdminCoursesPage() {
  const { data, loading, error, refetch } = useAdminData<Course[]>("/courses");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState("");
  const [saving, setSaving] = useState(false);

  const inputClass = "w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors";

  const openCreate = () => { setForm(emptyForm); setModal("create"); };
  const openEdit = (c: Course) => {
    setForm({ title: c.title, description: c.description, price: c.price, duration: c.duration, level: c.level, modules: c.modules });
    setEditId(c.id);
    setModal("edit");
  };

  const handleSave = async () => {
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

  const levelColor = (l: string) => l === "beginner" ? "text-green-400" : l === "intermediate" ? "text-yellow-400" : "text-red-400";

  const columns = [
    { key: "title", label: "Title" },
    { key: "level", label: "Level", render: (c: Course) => <span className={`capitalize text-xs ${levelColor(c.level)}`}>{c.level}</span> },
    { key: "duration", label: "Duration" },
    { key: "modules", label: "Modules" },
    { key: "price", label: "Price", render: (c: Course) => <span className="font-medium gradient-text">{formatPrice(c.price)}</span> },
    {
      key: "actions", label: "Actions",
      render: (c: Course) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(c)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><Pencil size={15} /></button>
          <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"><Trash2 size={15} /></button>
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

      <AdminTable columns={columns} data={data || []} loading={loading} error={error} onRetry={refetch} />

      <AdminModal open={!!modal} onClose={() => setModal(null)} title={modal === "create" ? "Add Course" : "Edit Course"}>
        <div className="space-y-4">
          <input type="text" placeholder="Course Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
          <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className={inputClass} />
            <input type="text" placeholder="Duration (e.g. 12 weeks)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className={inputClass}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <input type="number" placeholder="Modules" value={form.modules || ""} onChange={(e) => setForm({ ...form, modules: parseInt(e.target.value) || 0 })} className={inputClass} />
          </div>
          <Button onClick={handleSave} className="w-full" disabled={saving}>
            {saving ? "Saving..." : modal === "create" ? "Create Course" : "Update Course"}
          </Button>
        </div>
      </AdminModal>
    </>
  );
}
