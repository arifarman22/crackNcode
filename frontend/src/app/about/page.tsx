import { Metadata } from "next";
import { Target, Eye, Zap, Users, Award, Clock } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = { title: "About" };

const whyUs = [
  { icon: Zap, title: "Cutting-Edge Tech", desc: "We use the latest technologies to deliver future-proof solutions." },
  { icon: Users, title: "Client-Centric", desc: "Your success is our success. We build partnerships, not just projects." },
  { icon: Award, title: "Proven Results", desc: "500+ successful projects with measurable business impact." },
  { icon: Clock, title: "Fast Delivery", desc: "Agile workflows ensure on-time delivery without compromising quality." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6">
            We Are <span className="gradient-text">CrackNCode</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Born from a passion for digital innovation, CrackNCode is a full-service digital agency that helps businesses thrive in the digital age. From concept to execution, we deliver excellence.
          </p>
        </AnimatedSection>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection direction="left">
            <GlassCard className="h-full">
              <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4">
                <Target size={22} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-gray-400">
                To empower businesses and individuals with world-class digital solutions that drive growth, innovation, and lasting impact. We believe technology should be accessible, beautiful, and powerful.
              </p>
            </GlassCard>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <GlassCard className="h-full">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-4">
                <Eye size={22} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Vision</h2>
              <p className="text-gray-400">
                To become the leading digital ecosystem where businesses find everything they need — services, products, education, and community — to succeed in the digital economy.
              </p>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <SectionHeading tag="Why Us" title="Why Choose CrackNCode?" description="We don't just build — we transform." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <GlassCard className="text-center h-full">
                <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-4">
                  <item.icon size={22} className="text-white" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
