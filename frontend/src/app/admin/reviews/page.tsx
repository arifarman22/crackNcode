"use client";
import { useAdminData } from "@/hooks/useAdminData";
import AdminTable from "@/components/ui/AdminTable";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { api } from "@/lib/utils";
import { Check, Trash2, Star } from "lucide-react";
import toast from "react-hot-toast";

interface Review {
  id: string;
  rating: number;
  content: string;
  approved: boolean;
  createdAt: string;
  user: { name: string; email: string };
}

export default function AdminReviewsPage() {
  const { data, loading, error, refetch } = useAdminData<Review[]>("/reviews/all");

  const handleApprove = async (id: string) => {
    try {
      await api(`/reviews/${id}/approve`, { method: "PATCH" });
      toast.success("Review approved");
      refetch();
    } catch (e: any) { toast.error(e.message); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      await api(`/reviews/${id}`, { method: "DELETE" });
      toast.success("Review deleted");
      refetch();
    } catch (e: any) { toast.error(e.message); }
  };

  const columns = [
    {
      key: "user", label: "User",
      render: (r: Review) => (
        <div>
          <div className="font-medium text-sm">{r.user.name}</div>
          <div className="text-xs text-zinc-500">{r.user.email}</div>
        </div>
      ),
    },
    {
      key: "rating", label: "Rating",
      render: (r: Review) => (
        <div className="flex gap-0.5">
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      ),
    },
    {
      key: "content", label: "Review",
      render: (r: Review) => <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs truncate">{r.content}</p>,
    },
    {
      key: "approved", label: "Status",
      render: (r: Review) => (
        <span className={`text-xs px-2 py-1 rounded-full ${r.approved ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"}`}>
          {r.approved ? "Approved" : "Pending"}
        </span>
      ),
    },
    {
      key: "createdAt", label: "Date",
      render: (r: Review) => <span className="text-xs text-zinc-400">{new Date(r.createdAt).toLocaleDateString()}</span>,
    },
    {
      key: "actions", label: "Actions",
      render: (r: Review) => (
        <div className="flex gap-1">
          {!r.approved && (
            <button onClick={() => handleApprove(r.id)} className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-zinc-400 hover:text-emerald-500 transition-colors">
              <Check size={15} />
            </button>
          )}
          <button onClick={() => handleDelete(r.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors">
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <AnimatedSection>
        <h1 className="text-2xl font-semibold mb-6">Manage <span className="gradient-text">Reviews</span></h1>
      </AnimatedSection>
      <AdminTable columns={columns} data={data || []} loading={loading} error={error} onRetry={refetch} />
    </>
  );
}
