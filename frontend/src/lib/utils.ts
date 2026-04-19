const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function api<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("crackncode-auth") || "{}").state?.token
    : null;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message);
  }
  return res.json();
}

export const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const fbEvent = (name: string, data?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, data);
  }
};
