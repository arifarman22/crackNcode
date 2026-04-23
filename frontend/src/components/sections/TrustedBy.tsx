"use client";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const logos = [
  "TechCorp", "StartupX", "DesignLab", "CloudBase", "DataFlow",
  "AppWorks", "MediaPro", "ScaleUp", "DevHouse", "GrowthIO",
];

export default function TrustedBy() {
  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <AnimatedSection className="text-center mb-8">
        <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
          Trusted by 500+ businesses worldwide
        </p>
      </AnimatedSection>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10" />

        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center w-max"
        >
          {[...logos, ...logos].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-500 transition-colors duration-300 whitespace-nowrap select-none"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
