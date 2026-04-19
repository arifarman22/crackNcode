"use client";
import { courses } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Clock, BookOpen, BarChart3, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

const levelColors = { beginner: "text-green-400", intermediate: "text-yellow-400", advanced: "text-red-400" };

export default function AcademyPage() {
  return (
    <>
      <section className="section-padding text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <GraduationCap size={14} className="inline mr-1" /> Academy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Learn. Build. <span className="gradient-text">Succeed.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Master in-demand digital skills with expert-led, project-based courses.
          </p>
        </AnimatedSection>
      </section>

      <section className="section-padding !pt-0">
        <div className="grid sm:grid-cols-2 gap-8">
          {courses.map((c, i) => (
            <AnimatedSection key={c.id} delay={i * 0.1}>
              <GlassCard className="flex flex-col h-full">
                <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-blue-500/20 to-brand-500/20 flex items-center justify-center mb-4">
                  <BookOpen size={48} className="text-brand-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium capitalize ${levelColors[c.level]}`}>{c.level}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} />{c.duration}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><BarChart3 size={12} />{c.modules} modules</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                <p className="text-gray-400 text-sm flex-1">{c.description}</p>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-2xl font-bold gradient-text">{formatPrice(c.price)}</span>
                  <Link href="/contact">
                    <Button>Enroll Now</Button>
                  </Link>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
