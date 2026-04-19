"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[200px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(107,0,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(107,0,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-6">
            🚀 Digital Excellence Starts Here
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6"
        >
          Build. Grow. Scale.
          <br />
          <span className="gradient-text">Your Digital Empire.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Premium digital services, cutting-edge products, and world-class education — all under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/services">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/shop">
            <Button variant="secondary" size="lg">Explore Products</Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Clients" },
            { value: "1200+", label: "Projects" },
            { value: "99%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl sm:text-3xl font-semibold gradient-text">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
