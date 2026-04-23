"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark" />

      {/* Floating orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-72 h-72 bg-brand-400/15 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[160px]" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <motion.div variants={stagger} initial="hidden" animate="visible" className="section-padding text-center">
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Digital Excellence Starts Here
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
          Build. Grow. Scale.
          <br />
          <span className="gradient-text">Your Digital Empire.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Premium digital services, cutting-edge products, and world-class education — all under one roof.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services">
            <Button size="lg">Get Started →</Button>
          </Link>
          <Link href="/shop">
            <Button variant="secondary" size="lg">Explore Products</Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[
            { value: "50+", label: "Clients" },
            { value: "120+", label: "Projects" },
            { value: "98%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight gradient-text">{s.value}</div>
              <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
