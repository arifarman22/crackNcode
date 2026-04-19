"use client";
import { useState } from "react";
import { useAdminData } from "@/hooks/useAdminData";
import AdminTable from "@/components/ui/AdminTable";
import AdminModal from "@/components/ui/AdminModal";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { api } from "@/lib/utils";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { data, loading, error, refetch } = useAdminData<User[]>("/admin/users");
  const [editing, setEditing] = useState<User | null>(null);
  const [role, setRole] = useState("");

  const handleUpdateRole = async () => {
    if (!editing) return;
    try {
      await api(`/admin/users/${editing.id}/role`, { method: "PATCH", body: JSON.stringify({ role }) });
      toast.success("Role updated");
      setEditing(null);
      refetch();
    } catch (e: any) { toast.error(e.message); }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role", label: "Role",
      render: (u: User) => (
        <span className={`text-xs px-2 py-1 rounded-full ${u.role === "ADMIN" ? "bg-brand-500/20 text-brand-400" : "bg-white/10 text-gray-400"}`}>{u.role}</span>
      ),
    },
    { key: "createdAt", label: "Joined", render: (u: User) => <span className="text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</span> },
    {
      key: "actions", label: "Actions",
      render: (u: User) => (
        <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); setRole(u.role); setEditing(u); }}>
          Edit Role
        </Button>
      ),
    },
  ];

  return (
    <>
      <AnimatedSection>
        <h1 className="text-2xl font-semibold mb-6">Manage <span className="gradient-text">Users</span></h1>
      </AnimatedSection>

      <AdminTable columns={columns} data={data || []} loading={loading} error={error} onRetry={refetch} />

      <AdminModal open={!!editing} onClose={() => setEditing(null)} title="Edit User Role">
        {editing && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Editing role for <span className="text-white font-medium">{editing.name}</span> ({editing.email})
            </p>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-400/50"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
            <Button onClick={handleUpdateRole} className="w-full">Save Changes</Button>
          </div>
        )}
      </AdminModal>
    </>
  );
}
