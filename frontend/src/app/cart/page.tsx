"use client";
import { useCartStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <section className="section-padding text-center min-h-[60vh] flex flex-col items-center justify-center">
        <AnimatedSection>
          <ShoppingBag size={64} className="text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-400 mb-6">Explore our products and add something you love.</p>
          <Link href="/shop"><Button>Browse Shop</Button></Link>
        </AnimatedSection>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <AnimatedSection>
        <h1 className="text-3xl font-bold mb-8">Shopping <span className="gradient-text">Cart</span></h1>
      </AnimatedSection>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <AnimatedSection key={item.product.id}>
              <GlassCard hover={false} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-500/20 to-blue-500/20 flex items-center justify-center shrink-0">
                  <ShoppingBag size={24} className="text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.product.name}</h3>
                  <p className="text-sm text-gray-400">{formatPrice(item.product.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded-lg hover:bg-white/10"><Minus size={16} /></button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded-lg hover:bg-white/10"><Plus size={16} /></button>
                </div>
                <span className="font-semibold w-20 text-right">{formatPrice(item.product.price * item.quantity)}</span>
                <button onClick={() => removeItem(item.product.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"><Trash2 size={16} /></button>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.2}>
          <GlassCard hover={false} className="sticky top-24">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(total())}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Tax</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="gradient-text">{formatPrice(total())}</span>
              </div>
            </div>
            <Link href="/checkout">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
