"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const faqs = [
  {
    q: "What services does CrackNCode offer?",
    a: "We offer web development, UI/UX design, digital marketing, e-commerce solutions, mobile app development, and cyber security services. We also have an academy for learning and premium membership plans.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary based on complexity. A landing page takes 1-2 weeks, a full website 4-8 weeks, and complex web applications 2-4 months. We provide detailed timelines during our initial consultation.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes! All our projects include 30 days of free post-launch support. We also offer monthly maintenance plans for ongoing updates, security patches, performance monitoring, and content changes.",
  },
  {
    q: "What technologies do you use?",
    a: "We primarily use Next.js, React, TypeScript, Node.js, PostgreSQL, and Tailwind CSS. For mobile apps, we use React Native. We choose the best tech stack based on your project requirements.",
  },
  {
    q: "How do I get started with CrackNCode?",
    a: "Simply reach out through our contact page or WhatsApp. We'll schedule a free consultation to understand your needs, then provide a detailed proposal with timeline and pricing. No commitment required.",
  },
  {
    q: "What are your payment terms?",
    a: "We typically work with 50% upfront and 50% on completion for projects. For larger projects, we offer milestone-based payments. We accept bank transfers, credit cards, and popular payment gateways.",
  },
];

function FAQItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-colors duration-300 hover:border-brand-200 dark:hover:border-brand-500/30"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
      >
        <span className="text-sm sm:text-base font-medium">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown size={18} className="text-zinc-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding">
      <SectionHeading
        tag="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about working with us."
      />
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            q={faq.q}
            a={faq.a}
            open={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
