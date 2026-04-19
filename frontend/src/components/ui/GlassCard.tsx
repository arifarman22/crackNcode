"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = true }: Props) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      className={cn(
        "rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-glass transition-all duration-300",
        hover && "hover:border-brand-400/30 hover:shadow-glow",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
