"use client";
import { plans } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Check, X, Crown } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

const comparisonFeatures = [
  { name: "Basic Courses", basic: true, pro: true, elite: true },
  { name: "Premium Courses", basic: false, pro: true, elite: true },
  { name: "Community Forum", basic: true, pro: true, elite: true },
  { name: "1-on-1 Mentoring", basic: false, pro: true, elite: true },
  { name: "Unlimited Mentoring", basic: false, pro: false, elite: true },
  { name: "Project Reviews", basic: false, pro: true, elite: true },
  { name: "Certificates", basic: false, pro: true, elite: true },
  { name: "Job Placement", basic: false, pro: false, elite: true },
  { name: "Exclusive Workshops", basic: false, pro: false, elite: true },
  { name: "Custom Learning Path", basic: false, pro: false, elite: true },
];

export default function PremiumPage() {
  return (
    <>
      <section className="section-padding text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            <Crown size={14} className="inline mr-1" /> Premium
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6">
            Unlock <span className="gradient-text">Premium</span> Access
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Get exclusive content, mentoring, and resources to accelerate your growth.
          </p>
        </AnimatedSection>
      </section>

      {/* Plans */}
      <section className="section-padding !pt-0">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 0.15}>
              <GlassCard className={`flex flex-col h-full ${p.highlighted ? "border-brand-400/50 shadow-glow relative" : ""}`}>
                {p.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-brand-gradient text-white whitespace-nowrap">
                    Best Value
                  </span>
                )}
                <h3 className="text-lg sm:text-xl font-semibold mb-1">{p.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-semibold gradient-text">{formatPrice(p.price)}</span>
                  <span className="text-gray-500 text-sm"> / {p.interval}</span>
                </div>
                <ul className="space-y-2 sm:space-y-3 flex-1 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check size={16} className="text-brand-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/checkout">
                  <Button variant={p.highlighted ? "primary" : "secondary"} className="w-full">
                    Subscribe Now
                  </Button>
                </Link>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding !pt-0">
        <AnimatedSection>
          <GlassCard hover={false}>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Feature Comparison</h3>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-xs sm:text-sm min-w-[400px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-4 text-gray-400">Feature</th>
                    <th className="text-center py-3 px-2 sm:px-4">Basic</th>
                    <th className="text-center py-3 px-2 sm:px-4 text-brand-400">Pro</th>
                    <th className="text-center py-3 px-2 sm:px-4">Elite</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((f) => (
                    <tr key={f.name} className="border-b border-white/5">
                      <td className="py-2 sm:py-3 pr-4 text-gray-300">{f.name}</td>
                      {(["basic", "pro", "elite"] as const).map((tier) => (
                        <td key={tier} className="text-center py-2 sm:py-3 px-2 sm:px-4">
                          {f[tier] ? <Check size={14} className="text-green-400 mx-auto sm:w-4 sm:h-4" /> : <X size={14} className="text-gray-600 mx-auto sm:w-4 sm:h-4" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </AnimatedSection>
      </section>
    </>
  );
}
