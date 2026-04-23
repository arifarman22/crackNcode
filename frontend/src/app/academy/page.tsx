"use client";
import { courses } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Clock, BookOpen, BarChart3, GraduationCap, PlayCircle, Users, Award, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";

const levelColors: Record<string, string> = { beginner: "text-emerald-500", intermediate: "text-amber-500", advanced: "text-rose-500" };

const benefits = [
  { icon: PlayCircle, title: "Self-Paced Learning", desc: "Learn at your own speed with lifetime access to all course materials and updates." },
  { icon: Users, title: "Expert Instructors", desc: "Learn from industry professionals with years of real-world experience in their fields." },
  { icon: Award, title: "Certificates", desc: "Earn recognized certificates upon completion to showcase your skills to employers." },
  { icon: CheckCircle, title: "Project-Based", desc: "Build real projects throughout each course that you can add to your portfolio." },
];

export default function AcademyPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 mb-4">
            <GraduationCap size={14} className="inline mr-1" /> Academy
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6">
            Learn. Build. <span className="gradient-text">Succeed.</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Master in-demand digital skills with expert-led, project-based courses. Whether you&apos;re a beginner or looking to level up, we have the right course for you.
          </p>
        </AnimatedSection>
      </section>

      {/* Why Learn With Us */}
      <section className="section-padding !pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <AnimatedSection key={b.title} delay={i * 0.1}>
              <GlassCard className="text-center h-full">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-3">
                  <b.icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{b.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">{b.desc}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="section-padding">
        <SectionHeading tag="Courses" title="Explore Our Courses" description="Hands-on, project-based courses designed to get you job-ready." />
        <div className="grid sm:grid-cols-2 gap-6">
          {courses.map((c, i) => (
            <AnimatedSection key={c.id} delay={i * 0.1}>
              <GlassCard className="flex flex-col h-full">
                <div className="w-full h-36 sm:h-44 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-brand-500/10 dark:from-cyan-500/5 dark:to-brand-500/5 flex items-center justify-center mb-4">
                  <BookOpen size={44} className="text-brand-400" />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                  <span className={`text-xs font-medium capitalize ${levelColors[c.level] || "text-zinc-400"}`}>{c.level}</span>
                  <span className="text-xs text-zinc-300 dark:text-zinc-600">•</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1"><Clock size={12} />{c.duration}</span>
                  <span className="text-xs text-zinc-300 dark:text-zinc-600">•</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1"><BarChart3 size={12} />{c.modules} modules</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{c.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm flex-1 leading-relaxed">{c.description}</p>
                <div className="flex items-center justify-between mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xl sm:text-2xl font-semibold gradient-text">{formatPrice(c.price)}</span>
                  <Link href="/contact">
                    <Button>Enroll Now</Button>
                  </Link>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <AnimatedSection>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-cyan-500/5 to-brand-500/5 dark:from-cyan-500/10 dark:to-brand-500/10 border border-zinc-200 dark:border-zinc-800 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">Not Sure Which Course to Pick?</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-6 leading-relaxed">
              Book a free 15-minute call with our learning advisor. We&apos;ll help you choose the right course based on your goals, experience level, and career aspirations.
            </p>
            <Link href="/contact">
              <Button size="lg">Book Free Consultation →</Button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
