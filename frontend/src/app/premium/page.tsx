"use client";
import { plans } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Check, X, Crown, Zap, Users, BookOpen, Headphones } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
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

const premiumBenefits = [
  { icon: Zap, title: "Accelerated Learning", desc: "Structured paths designed to get you from zero to job-ready 3x faster than self-study." },
  { icon: Users, title: "1-on-1 Mentoring", desc: "Get personalized guidance from industry experts who've been where you want to go." },
  { icon: BookOpen, title: "Exclusive Content", desc: "Access premium courses, workshops, and resources not available to free users." },
  { icon: Headphones, title: "Priority Support", desc: "Skip the queue. Get your questions answered within hours, not days." },
];

export default function PremiumPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 mb-4">
            <Crown size={14} className="inline mr-1" /> Premium
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6">
            Unlock <span className="gradient-text">Premium</span> Access
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Get exclusive content, 1-on-1 mentoring, and premium resources to accelerate your growth. Invest in yourself — the returns are unlimited.
          </p>
        </AnimatedSection>
      </section>

      {/* Benefits */}
      <section className="section-padding !pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {premiumBenefits.map((b, i) => (
            <AnimatedSection key={b.title} delay={i * 0.1}>
              <GlassCard className="text-center h-full">
                <div className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center mx-auto mb-3">
                  <b.icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{b.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">{b.desc}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding">
        <SectionHeading tag="Plans" title="Choose Your Plan" description="Cancel anytime. No long-term contracts. 7-day money-back guarantee." />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 0.15}>
              <GlassCard className={`flex flex-col h-full ${p.highlighted ? "border-brand-300 dark:border-brand-500/50 shadow-glow relative" : ""}`}>
                {p.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-brand-gradient text-white whitespace-nowrap">
                    Best Value
                  </span>
                )}
                <h3 className="text-lg sm:text-xl font-semibold mb-1">{p.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-semibold gradient-text">{formatPrice(p.price)}</span>
                  <span className="text-zinc-400 text-sm"> / {p.interval}</span>
                </div>
                <ul className="space-y-2 sm:space-y-3 flex-1 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                      <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
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
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-3 pr-4 text-zinc-500">Feature</th>
                    <th className="text-center py-3 px-2 sm:px-4">Basic</th>
                    <th className="text-center py-3 px-2 sm:px-4 text-brand-600 dark:text-brand-400">Pro</th>
                    <th className="text-center py-3 px-2 sm:px-4">Elite</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((f) => (
                    <tr key={f.name} className="border-b border-zinc-100 dark:border-zinc-800/50">
                      <td className="py-2 sm:py-3 pr-4 text-zinc-700 dark:text-zinc-300">{f.name}</td>
                      {(["basic", "pro", "elite"] as const).map((tier) => (
                        <td key={tier} className="text-center py-2 sm:py-3 px-2 sm:px-4">
                          {f[tier] ? <Check size={14} className="text-emerald-500 mx-auto" /> : <X size={14} className="text-zinc-300 dark:text-zinc-700 mx-auto" />}
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

      {/* Money-back guarantee */}
      <section className="section-padding !pt-0">
        <AnimatedSection>
          <div className="rounded-3xl p-8 sm:p-12 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">7-Day Money-Back Guarantee</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Try any plan risk-free. If you&apos;re not completely satisfied within the first 7 days, we&apos;ll refund your payment in full — no questions asked.
            </p>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
