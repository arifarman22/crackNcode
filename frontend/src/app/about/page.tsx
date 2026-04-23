import { Metadata } from "next";
import { Target, Eye, Zap, Users, Award, Clock, Heart, Globe, Lightbulb, Shield } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = { title: "About" };

const whyUs = [
  { icon: Zap, title: "Cutting-Edge Tech", desc: "We use Next.js, React, Node.js, and modern cloud infrastructure to deliver future-proof solutions that scale." },
  { icon: Users, title: "Client-Centric", desc: "Your success is our success. We build long-term partnerships, not just one-off projects. Every decision starts with your goals." },
  { icon: Award, title: "Proven Results", desc: "50+ successful projects with measurable business impact. Our clients see an average 150% increase in online engagement." },
  { icon: Clock, title: "Fast Delivery", desc: "Agile sprints with weekly updates ensure on-time delivery. Most projects launch within 4-8 weeks without compromising quality." },
];

const values = [
  { icon: Heart, title: "Passion", desc: "We genuinely love what we do. Every pixel, every line of code is crafted with care and attention to detail." },
  { icon: Lightbulb, title: "Innovation", desc: "We stay ahead of trends and constantly explore new technologies to give our clients a competitive edge." },
  { icon: Shield, title: "Integrity", desc: "Transparent pricing, honest timelines, and clear communication. No hidden fees, no surprises — ever." },
  { icon: Globe, title: "Impact", desc: "We measure success by the real-world impact we create for our clients' businesses and their customers." },
];

const journey = [
  { year: "2022", title: "Founded", desc: "CrackNCode was born from a simple idea — make premium digital services accessible to businesses of all sizes." },
  { year: "2023", title: "Growing Fast", desc: "Expanded our team, launched CrackNCode Academy, and delivered 30+ projects across 5 countries." },
  { year: "2024", title: "Going Premium", desc: "Introduced Premium memberships, advanced e-commerce solutions, and crossed 50+ happy clients." },
  { year: "2025", title: "Scaling Up", desc: "Building AI-powered tools, expanding into mobile development, and growing our global community." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 mb-4">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6">
            We Are <span className="gradient-text">CrackNCode</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Born from a passion for digital innovation, CrackNCode is a full-service digital agency that helps businesses thrive in the digital age. We combine creativity, technology, and strategy to deliver results that matter.
          </p>
        </AnimatedSection>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding !pt-0">
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatedSection direction="left">
            <GlassCard className="h-full">
              <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4">
                <Target size={22} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                To empower businesses and individuals with world-class digital solutions that drive growth, innovation, and lasting impact. We believe technology should be accessible, beautiful, and powerful — regardless of your budget or business size.
              </p>
            </GlassCard>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <GlassCard className="h-full">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                <Eye size={22} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Vision</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                To become the leading digital ecosystem where businesses find everything they need — services, products, education, and community — to succeed in the digital economy. We envision a world where every business has access to premium digital tools.
              </p>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Journey */}
      <section className="section-padding">
        <SectionHeading tag="Timeline" title="Our Journey" description="From a small idea to a growing digital ecosystem." />
        <div className="max-w-3xl mx-auto">
          {journey.map((item, i) => (
            <AnimatedSection key={item.year} delay={i * 0.1}>
              <div className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-semibold shrink-0">
                    {item.year}
                  </div>
                  {i < journey.length - 1 && <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-800 mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <SectionHeading tag="Values" title="What We Stand For" description="The principles that guide everything we do." />
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <GlassCard className="h-full">
                <div className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <SectionHeading tag="Why Us" title="Why Choose CrackNCode?" description="We don't just build — we transform businesses." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyUs.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <GlassCard className="text-center h-full">
                <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-4">
                  <item.icon size={22} className="text-white" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
