"use client";
import { motion } from "framer-motion";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-white dark:bg-zinc-950"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-[120px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-20 h-20 rounded-2xl bg-brand-gradient flex items-center justify-center mb-6 shadow-glow"
        >
          <span className="text-white text-3xl font-bold">C</span>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl sm:text-3xl font-semibold tracking-tight"
        >
          <span className="gradient-text">CrackNCode</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-sm text-zinc-400 mt-2"
        >
          Digital Excellence
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="mt-8 w-48 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full bg-brand-gradient"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
