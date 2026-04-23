"use client";
import Image from "next/image";
import { products } from "@/lib/data";
import { formatPrice, fbEvent } from "@/lib/utils";
import { useCartStore } from "@/store";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export default function FeaturedProducts() {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (product: (typeof products)[0]) => {
    addItem(product);
    fbEvent("AddToCart", { content_name: product.name, value: product.price, currency: "USD" });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="section-padding">
      <SectionHeading tag="Shop" title="Featured Products" description="Digital tools and packages to accelerate your growth." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.slice(0, 3).map((p, i) => (
          <AnimatedSection key={p.id} delay={i * 0.1}>
            <GlassCard className="flex flex-col h-full group overflow-hidden !p-0">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 via-transparent to-transparent" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-medium tracking-wider uppercase text-brand-600 dark:text-brand-400">{p.category}</span>
                <h3 className="text-base font-semibold mt-1 mb-2 tracking-tight">{p.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm flex-1 leading-relaxed">{p.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-lg font-semibold gradient-text">{formatPrice(p.price)}</span>
                  <Button size="sm" onClick={() => handleAdd(p)}>
                    <ShoppingCart size={14} /> Add
                  </Button>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
