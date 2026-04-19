"use client";
import { testimonials } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Star, User } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="section-padding">
      <SectionHeading tag="Testimonials" title="What Our Clients Say" description="Real results from real businesses." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.id} delay={i * 0.1}>
            <GlassCard className="h-full">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-6 italic">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
