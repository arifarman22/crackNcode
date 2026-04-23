"use client";
import Link from "next/link";
import { GraduationCap, Crown, ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function SubBrands() {
  return (
    <section className="section-padding">
      <SectionHeading tag="Ecosystem" title="Our Sub-Brands" description="Specialized platforms for learning and exclusive access." />
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatedSection direction="left">
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[80px] transition-all duration-700 group-hover:w-64 group-hover:h-64" />
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
              <GraduationCap size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 tracking-tight">CrackNCode Academy</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
              Master in-demand digital skills with expert-led courses. From web development to marketing — learn at your own pace.
            </p>
            <Link href="/academy" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 group-hover:gap-3 transition-all duration-300">
              Explore Courses <ArrowRight size={16} />
            </Link>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[80px] transition-all duration-700 group-hover:w-64 group-hover:h-64" />
            <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center mb-4">
              <Crown size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 tracking-tight">CrackNCode Premium</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
              Unlock exclusive content, 1-on-1 mentoring, and premium resources. Elevate your skills with our membership plans.
            </p>
            <Link href="/premium" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 group-hover:gap-3 transition-all duration-300">
              View Plans <ArrowRight size={16} />
            </Link>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
