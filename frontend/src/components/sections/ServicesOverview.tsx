"use client";
import { Code, Palette, TrendingUp, Globe, Smartphone, Shield } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const items = [
  { icon: Code, title: "Web Development", desc: "Custom websites and web apps built with modern tech stacks.", color: "from-brand-500 to-brand-400" },
  { icon: Palette, title: "UI/UX Design", desc: "Stunning interfaces that convert visitors into customers.", color: "from-pink-500 to-rose-400" },
  { icon: TrendingUp, title: "Digital Marketing", desc: "SEO, social media, and paid ads to grow your reach.", color: "from-emerald-500 to-teal-400" },
  { icon: Globe, title: "E-Commerce", desc: "Full-featured online stores with payment integration.", color: "from-amber-500 to-orange-400" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Cross-platform mobile applications for iOS and Android.", color: "from-cyan-500 to-blue-400" },
  { icon: Shield, title: "Cyber Security", desc: "Protect your digital assets with enterprise-grade security.", color: "from-violet-500 to-purple-400" },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding">
      <SectionHeading tag="What We Do" title="Services That Drive Results" description="End-to-end digital solutions tailored to your business needs." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <AnimatedSection key={item.title} delay={i * 0.08}>
            <GlassCard className="h-full group">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                <item.icon size={20} className="text-white" />
              </div>
              <h3 className="text-base font-semibold mb-2 tracking-tight">{item.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
