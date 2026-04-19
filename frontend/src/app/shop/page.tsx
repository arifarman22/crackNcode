"use client";
import { useState } from "react";
import Image from "next/image";
import { products, categories } from "@/lib/data";
import { formatPrice, fbEvent } from "@/lib/utils";
import { useCartStore } from "@/store";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ShoppingCart, Search } from "lucide-react";
import toast from "react-hot-toast";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const addItem = useCartStore((s) => s.addItem);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.category === category;
    return matchSearch && matchCat;
  });

  const handleAdd = (product: (typeof products)[0]) => {
    addItem(product);
    fbEvent("AddToCart", { content_name: product.name, value: product.price, currency: "USD" });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="section-padding">
      <SectionHeading tag="Shop" title="Digital Products & Packages" description="Tools, templates, and bundles to supercharge your business." />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                category === c
                  ? "bg-brand-gradient text-white"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, i) => (
          <AnimatedSection key={p.id} delay={i * 0.05}>
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
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-brand-400 uppercase tracking-wider font-medium">{p.category}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">{p.type}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
              <p className="text-gray-400 text-sm flex-1 font-light">{p.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-semibold gradient-text">{formatPrice(p.price)}</span>
                <Button size="sm" onClick={() => handleAdd(p)}>
                  <ShoppingCart size={16} /> Add to Cart
                </Button>
              </div>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">No products found matching your criteria.</div>
      )}
    </section>
  );
}
