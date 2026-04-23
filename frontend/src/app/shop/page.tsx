"use client";
 import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { formatPrice, fbEvent, api } from "@/lib/utils";
import { useCartStore } from "@/store";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ShoppingCart, Search, ChevronLeft, ChevronRight, Package } from "lucide-react";
import toast from "react-hot-toast";
import { products as staticProducts, categories } from "@/lib/data";
import { Product } from "@/types";

interface PaginatedProducts {
  data: Product[];
  pagination: { page: number; limit: number; total: number; totalPages: number; hasNext: boolean; hasPrev: boolean };
}

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PaginatedProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [useApi, setUseApi] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "9");
      if (category !== "all") params.set("category", category);
      if (search) params.set("search", search);
      if (sort) params.set("sort", sort);

      const res = await api<PaginatedProducts>(`/products?${params}`);
      setResult(res);
    } catch {
      // Fallback to static data if API unavailable
      setUseApi(false);
    }
    setLoading(false);
  }, [page, category, search, sort]);

  useEffect(() => { if (useApi) fetchProducts(); }, [fetchProducts, useApi]);

  // Fallback static filtering
  const staticFiltered = staticProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.category === category;
    return matchSearch && matchCat;
  });

  const products = useApi ? (result?.data || []) : staticFiltered;
  const pagination = result?.pagination;

  const handleAdd = (product: Product) => {
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
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setPage(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                category === c
                  ? "bg-brand-gradient text-white shadow-glow"
                  : "bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className="px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-zinc-100 dark:bg-zinc-800 h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 0.05}>
              <GlassCard className="flex flex-col h-full group overflow-hidden !p-0">
                <div className="relative w-full h-48 overflow-hidden">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  ) : (
                    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Package size={40} className="text-zinc-300 dark:text-zinc-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 via-transparent to-transparent" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium tracking-wider uppercase text-brand-600 dark:text-brand-400">{p.category}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">{p.type}</span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight mb-1">{p.name}</h3>
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
      )}

      {products.length === 0 && !loading && (
        <div className="text-center py-16 text-zinc-400">No products found matching your criteria.</div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <Button
            size="sm"
            variant="secondary"
            disabled={!pagination.hasPrev}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft size={16} /> Prev
          </Button>
          <span className="text-sm text-zinc-500">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            size="sm"
            variant="secondary"
            disabled={!pagination.hasNext}
            onClick={() => setPage(page + 1)}
          >
            Next <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </section>
  );
}
