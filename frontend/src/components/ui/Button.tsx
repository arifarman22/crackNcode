"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  primary: "bg-brand-gradient text-white shadow-glow hover:shadow-glow-lg",
  secondary: "border border-brand-400/30 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10",
  ghost: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({ variant = "primary", size = "md", className, children, ...props }: Props) {
  return (
    <motion.button
      whileHover={{ y: -2, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "rounded-xl font-medium transition-all duration-500 inline-flex items-center justify-center gap-2 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
