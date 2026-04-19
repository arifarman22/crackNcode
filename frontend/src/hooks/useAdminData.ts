import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/utils";
import { useAuthStore } from "@/store";

export function useAdminData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api<T>(endpoint);
      setData(res);
    } catch (e: any) {
      const msg = e.message || "Failed to fetch";
      if (["Authentication required", "Token expired", "Invalid token", "Admin access required", "User no longer exists"].includes(msg)) {
        logout();
        router.push("/auth/login");
        return;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [endpoint, logout, router]);

  useEffect(() => { refetch(); }, [refetch]);

  return { data, loading, error, refetch, setData };
}
