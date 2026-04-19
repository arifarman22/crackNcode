"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store";
import { formatPrice, fbEvent } from "@/lib/utils";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const inputClass =
    "w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors";

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setLoading(true);
    // Payment gateway hook - replace with SSLCommerz/Stripe
    await new Promise((r) => setTimeout(r, 1500));
    fbEvent("Purchase", { value: total(), currency: "USD", num_items: items.length });
    clearCart();
    toast.success("Order placed successfully!");
    router.push("/order-success");
  };

  return (
    <section className="section-padding">
      <AnimatedSection>
        <h1 className="text-3xl font-bold mb-8"><span className="gradient-text">Checkout</span></h1>
      </AnimatedSection>

      <form onSubmit={handleCheckout}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatedSection>
              <GlassCard hover={false}>
                <h3 className="text-lg font-bold mb-4">Billing Details</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                    <input type="tel" placeholder="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                  </div>
                  <input type="text" placeholder="Address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} />
                </div>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <GlassCard hover={false}>
                <h3 className="text-lg font-bold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {["Credit/Debit Card", "SSLCommerz", "Stripe"].map((m) => (
                    <label key={m} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-brand-400/30 cursor-pointer transition-colors">
                      <input type="radio" name="payment" defaultChecked={m === "Stripe"} className="accent-purple-500" />
                      <span className="text-sm">{m}</span>
                    </label>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2}>
            <GlassCard hover={false} className="sticky top-24">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-300 truncate mr-2">{item.product.name} x{item.quantity}</span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between font-bold mb-4">
                <span>Total</span>
                <span className="gradient-text">{formatPrice(total())}</span>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : `Pay ${formatPrice(total())}`}
              </Button>
            </GlassCard>
          </AnimatedSection>
        </div>
      </form>
    </section>
  );
}
