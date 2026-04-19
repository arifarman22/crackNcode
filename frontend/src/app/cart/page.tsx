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
          <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
          <p className="text-gray-400 mb-6">Explore our products and add something you love.</p>
          <Link href="/shop"><Button>Browse Shop</Button></Link>
        </AnimatedSection>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <AnimatedSection>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">Shopping <span className="gradient-text">Cart</span></h1>
      </AnimatedSection>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <AnimatedSection key={item.product.id}>
              <GlassCard hover={false} className="space-y-3 sm:space-y-0">
                {/* Mobile: stacked, Desktop: row */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-brand-500/20 to-blue-500/20 flex items-center justify-center shrink-0">
                    <ShoppingBag size={20} className="text-brand-400 sm:hidden" />
                    <ShoppingBag size={24} className="text-brand-400 hidden sm:block" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{item.product.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{formatPrice(item.product.price)} each</p>
                  </div>
                  {/* Desktop: inline controls */}
                  <div className="hidden sm:flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 rounded-lg hover:bg-white/10"><Minus size={14} /></button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 rounded-lg hover:bg-white/10"><Plus size={14} /></button>
                  </div>
                  <span className="hidden sm:block font-semibold text-sm w-20 text-right">{formatPrice(item.product.price * item.quantity)}</span>
                  <button onClick={() => removeItem(item.product.id)} className="hidden sm:block p-2 rounded-lg hover:bg-red-500/10 text-red-400"><Trash2 size={16} /></button>
                </div>
                {/* Mobile: bottom row with controls */}
                <div className="flex sm:hidden items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 rounded-lg hover:bg-white/10 border border-white/10"><Minus size={14} /></button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 rounded-lg hover:bg-white/10 border border-white/10"><Plus size={14} /></button>
                  </div>
                  <span className="font-semibold text-sm gradient-text">{formatPrice(item.product.price * item.quantity)}</span>
                  <button onClick={() => removeItem(item.product.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"><Trash2 size={14} /></button>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.2}>
          <GlassCard hover={false} className="sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal ({items.length} items)</span>
                <span>{formatPrice(total())}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Tax</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-semibold">
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
