"use client";
import { Code, Palette, TrendingUp, Globe, Smartphone, Shield } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const items = [
  { icon: Code, title: "Web Development", desc: "Custom websites and web apps built with modern tech stacks." },
  { icon: Palette, title: "UI/UX Design", desc: "Stunning interfaces that convert visitors into customers." },
  { icon: TrendingUp, title: "Digital Marketing", desc: "SEO, social media, and paid ads to grow your reach." },
  { icon: Globe, title: "E-Commerce", desc: "Full-featured online stores with payment integration." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Cross-platform mobile applications for iOS and Android." },
  { icon: Shield, title: "Cyber Security", desc: "Protect your digital assets with enterprise-grade security." },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding">
      <SectionHeading tag="What We Do" title="Services That Drive Results" description="End-to-end digital solutions tailored to your business needs." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <AnimatedSection key={item.title} delay={i * 0.1}>
            <GlassCard className="h-full">
              <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4">
                <item.icon size={22} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
