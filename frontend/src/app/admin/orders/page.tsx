"use client";
import { useState } from "react";
import { useAdminData } from "@/hooks/useAdminData";
import AdminTable from "@/components/ui/AdminTable";
import AdminModal from "@/components/ui/AdminModal";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { api, formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  user: { id: string; name: string; email: string };
  items: { id: string; quantity: number; price: number }[];
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400",
  PAID: "bg-blue-500/10 text-blue-400",
  COMPLETED: "bg-green-500/10 text-green-400",
  CANCELLED: "bg-red-500/10 text-red-400",
};

export default function AdminOrdersPage() {
  const { data, loading, error, refetch } = useAdminData<Order[]>("/orders/all");
  const [editing, setEditing] = useState<Order | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const inputClass = "w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-400/50 transition-colors";

  const handleUpdate = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await api(`/orders/${editing.id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      toast.success("Order status updated");
      setEditing(null);
      refetch();
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  const columns = [
    { key: "id", label: "Order ID", render: (o: Order) => <span className="text-xs font-mono text-gray-400">{o.id.slice(0, 12)}...</span> },
    { key: "user", label: "Customer", render: (o: Order) => (<div><div className="font-medium text-sm">{o.user.name}</div><div className="text-xs text-gray-500">{o.user.email}</div></div>) },
    { key: "items", label: "Items", render: (o: Order) => <span>{o.items.length} item(s)</span> },
    { key: "total", label: "Total", render: (o: Order) => <span className="font-medium gradient-text">{formatPrice(o.total)}</span> },
    { key: "status", label: "Status", render: (o: Order) => <span className={`text-xs px-2 py-1 rounded-full ${statusColors[o.status] || "bg-white/10"}`}>{o.status}</span> },
    { key: "createdAt", label: "Date", render: (o: Order) => <span className="text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</span> },
    { key: "actions", label: "Actions", render: (o: Order) => <Button size="sm" variant="secondary" onClick={() => { setStatus(o.status); setEditing(o); }}>Update</Button> },
  ];

  return (
    <>
      <AnimatedSection>
        <h1 className="text-2xl font-semibold mb-6">Manage <span className="gradient-text">Orders</span></h1>
      </AnimatedSection>

      <AdminTable columns={columns} data={data || []} loading={loading} error={error} onRetry={refetch} />

      <AdminModal open={!!editing} onClose={() => setEditing(null)} title="Update Order Status">
        {editing && (
          <div className="space-y-4">
            <div className="text-sm text-gray-400">
              Order <span className="text-white font-mono">{editing.id.slice(0, 12)}...</span> — {formatPrice(editing.total)}
            </div>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <Button onClick={handleUpdate} className="w-full" disabled={saving}>
              {saving ? "Updating..." : "Update Status"}
            </Button>
          </div>
        )}
      </AdminModal>
    </>
  );
}
