"use client";
import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Rocket } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Tell Us Your Vision",
    desc: "Share your goals, challenges, and ideas. We listen carefully and analyze your market to craft the perfect strategy for your business.",
    color: "from-brand-500 to-brand-400",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "We Design & Build",
    desc: "Our team designs, develops, and tests your solution with agile sprints. You get regular updates and full transparency throughout the process.",
    color: "from-cyan-500 to-blue-400",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Launch & Grow",
    desc: "We deploy your project, set up analytics, and provide ongoing support. Watch your business grow with data-driven optimization and scaling.",
    color: "from-emerald-500 to-teal-400",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, delay: i * 0.2 },
  }),
};

export default function HowItWorks() {
  return (
    <section className="section-padding">
      <SectionHeading
        tag="Process"
        title="How It Works"
        description="Three simple steps to transform your digital presence. We make it easy."
      />

      <div className="grid md:grid-cols-3 gap-6 sm:gap-8 relative">
        {/* Connecting line (desktop) */}
        <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -6, transition: { duration: 0.4 } }}
            className="relative text-center group"
          >
            {/* Step number */}
            <div className="relative z-10 mx-auto mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <step.icon size={28} className="text-white" />
              </div>
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {step.num}
              </span>
            </div>

            <h3 className="text-lg font-semibold tracking-tight mb-3">{step.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
