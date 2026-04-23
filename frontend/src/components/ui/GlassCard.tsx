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
      whileHover={hover ? { y: -6, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } } : undefined}
      className={cn(
        "rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800",
        "shadow-soft dark:shadow-dark-soft transition-all duration-500",
        hover && "hover:shadow-soft-lg dark:hover:shadow-glow hover:border-brand-200 dark:hover:border-brand-500/30",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
