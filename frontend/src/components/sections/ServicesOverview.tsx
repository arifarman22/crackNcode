"use client";
import { motion } from "framer-motion";
import { Code, Palette, TrendingUp, Globe, Smartphone, Shield, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";

const services = [
  {
    icon: Code,
    title: "Web Development",
    desc: "We build fast, scalable, and SEO-optimized websites and web applications using Next.js, React, and Node.js. From landing pages to complex SaaS platforms — we deliver pixel-perfect results.",
    features: ["Custom Web Apps", "API Development", "CMS Integration", "Performance Optimization"],
    color: "from-brand-500 to-brand-400",
    bg: "bg-brand-50 dark:bg-brand-500/5",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Our design team creates intuitive, beautiful interfaces that users love. We follow modern design principles with Figma prototyping, user research, and iterative testing to maximize conversions.",
    features: ["Wireframing & Prototyping", "Design Systems", "User Research", "A/B Testing"],
    color: "from-pink-500 to-rose-400",
    bg: "bg-pink-50 dark:bg-pink-500/5",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Grow your online presence with data-driven marketing strategies. We handle SEO, Google Ads, Meta Ads, email campaigns, and social media management to drive real, measurable results.",
    features: ["SEO & Content Strategy", "Paid Advertising", "Social Media Management", "Analytics & Reporting"],
    color: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/5",
  },
  {
    icon: Globe,
    title: "E-Commerce Solutions",
    desc: "Launch and scale your online store with our end-to-end e-commerce solutions. We integrate payment gateways, inventory management, and shipping — everything you need to sell online.",
    features: ["Shopify & Custom Stores", "Payment Integration", "Inventory Systems", "Order Management"],
    color: "from-amber-500 to-orange-400",
    bg: "bg-amber-50 dark:bg-amber-500/5",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Cross-platform mobile apps for iOS and Android built with React Native. We deliver smooth, native-feeling experiences with push notifications, offline support, and app store deployment.",
    features: ["iOS & Android Apps", "React Native", "Push Notifications", "App Store Deployment"],
    color: "from-cyan-500 to-blue-400",
    bg: "bg-cyan-50 dark:bg-cyan-500/5",
  },
  {
    icon: Shield,
    title: "Cyber Security",
    desc: "Protect your digital assets with enterprise-grade security audits, penetration testing, and compliance consulting. We identify vulnerabilities before attackers do and keep your data safe.",
    features: ["Security Audits", "Penetration Testing", "SSL & Encryption", "Compliance Consulting"],
    color: "from-violet-500 to-purple-400",
    bg: "bg-violet-50 dark:bg-violet-500/5",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 80, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function ServicesOverview() {
  return (
    <section className="section-padding">
      <SectionHeading
        tag="What We Do"
        title="Services That Drive Results"
        description="End-to-end digital solutions tailored to your business needs. We combine strategy, design, and technology to help you grow."
      />

      <div className="space-y-5">
        {services.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -4, transition: { duration: 0.4 } }}
            className="group rounded-2xl p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-soft dark:shadow-dark-soft hover:shadow-soft-lg dark:hover:shadow-glow hover:border-brand-200 dark:hover:border-brand-500/30 transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <item.icon size={26} className="text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight">{item.title}</h3>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500"
                  >
                    Get Started <ArrowRight size={14} />
                  </Link>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  {item.features.map((f) => (
                    <span
                      key={f}
                      className={`text-xs px-3 py-1 rounded-full ${item.bg} text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800 transition-colors duration-300`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
