"use client";
import { services } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      <section className="section-padding text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </AnimatedSection>
      </section>

      <section className="section-padding !pt-0">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <AnimatedSection key={s.id} delay={i * 0.15}>
              <GlassCard
                className={`h-full flex flex-col ${s.tier === "pro" ? "border-brand-400/50 shadow-glow relative" : ""}`}
              >
                {s.tier === "pro" && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-brand-gradient text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{s.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{s.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold gradient-text">{formatPrice(s.price)}</span>
                  <span className="text-gray-500 text-sm"> / project</span>
                </div>
                <ul className="space-y-3 flex-1 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check size={16} className="text-brand-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button variant={s.tier === "pro" ? "primary" : "secondary"} className="w-full">
                    Get Started
                  </Button>
                </Link>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
