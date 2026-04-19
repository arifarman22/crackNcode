"use client";
import Link from "next/link";
import { GraduationCap, Crown } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function SubBrands() {
  return (
    <section className="section-padding">
      <SectionHeading tag="Ecosystem" title="Our Sub-Brands" description="Specialized platforms for learning and exclusive access." />
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatedSection direction="left">
          <GlassCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px]" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-4">
              <GraduationCap size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">CrackNCode Academy</h3>
            <p className="text-gray-400 mb-6">
              Master in-demand digital skills with expert-led courses. From web development to marketing — learn at your own pace.
            </p>
            <Link href="/academy">
              <Button>Explore Courses</Button>
            </Link>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <GlassCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/10 rounded-full blur-[80px]" />
            <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4">
              <Crown size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">CrackNCode Premium</h3>
            <p className="text-gray-400 mb-6">
              Unlock exclusive content, 1-on-1 mentoring, and premium resources. Elevate your skills with our membership plans.
            </p>
            <Link href="/premium">
              <Button>View Plans</Button>
            </Link>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
