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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 3).map((p, i) => (
          <AnimatedSection key={p.id} delay={i * 0.1}>
            <GlassCard className="flex flex-col h-full">
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <span className="text-xs text-brand-400 uppercase tracking-wider font-medium">{p.category}</span>
              <h3 className="text-lg font-semibold mt-1 mb-2">{p.name}</h3>
              <p className="text-gray-400 text-sm flex-1 font-light">{p.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-semibold gradient-text">{formatPrice(p.price)}</span>
                <Button size="sm" onClick={() => handleAdd(p)}>
                  <ShoppingCart size={16} /> Add
                </Button>
              </div>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
