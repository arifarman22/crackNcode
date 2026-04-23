"use client";
import { services } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Check, ArrowRight, Shield, Clock, Headphones } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";

const guarantees = [
  { icon: Shield, title: "Money-Back Guarantee", desc: "Not satisfied? Get a full refund within 14 days of project delivery." },
  { icon: Clock, title: "On-Time Delivery", desc: "We commit to deadlines. If we're late, you get 10% off your next project." },
  { icon: Headphones, title: "30-Day Free Support", desc: "Every project includes 30 days of free post-launch support and bug fixes." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 mb-4">
            Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Choose the plan that fits your needs. No hidden fees, no surprises. Every plan includes dedicated support and unlimited revisions until you&apos;re happy.
          </p>
        </AnimatedSection>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding !pt-0">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((s, i) => (
            <AnimatedSection key={s.id} delay={i * 0.15}>
              <GlassCard className={`h-full flex flex-col ${s.tier === "pro" ? "border-brand-300 dark:border-brand-500/50 shadow-glow relative" : ""}`}>
                {s.tier === "pro" && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-brand-gradient text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-1">{s.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">{s.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-semibold gradient-text">{formatPrice(s.price)}</span>
                  <span className="text-zinc-400 text-sm"> / project</span>
                </div>
                <ul className="space-y-3 flex-1 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                      <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button variant={s.tier === "pro" ? "primary" : "secondary"} className="w-full">
                    Get Started <ArrowRight size={14} />
                  </Button>
                </Link>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Guarantees */}
      <section className="section-padding">
        <SectionHeading tag="Promise" title="Our Guarantees" description="We stand behind every project we deliver." />
        <div className="grid sm:grid-cols-3 gap-5">
          {guarantees.map((g, i) => (
            <AnimatedSection key={g.title} delay={i * 0.1}>
              <GlassCard className="text-center h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <g.icon size={22} className="text-emerald-500" />
                </div>
                <h3 className="font-semibold mb-2">{g.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{g.desc}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Custom Project CTA */}
      <section className="section-padding">
        <AnimatedSection>
          <div className="rounded-3xl p-8 sm:p-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">Need a Custom Solution?</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-6 leading-relaxed">
              Every business is unique. If our standard packages don&apos;t fit your needs, let&apos;s create a custom plan tailored specifically for your goals and budget.
            </p>
            <Link href="/contact">
              <Button size="lg">Request Custom Quote →</Button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
