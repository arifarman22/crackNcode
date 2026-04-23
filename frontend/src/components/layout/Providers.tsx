"use client";
import { useEffect, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "@/store";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import SplashScreen from "./SplashScreen";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: ReactNode }) {
  const dark = useThemeStore((s) => s.dark);
  const pathname = usePathname();
  const [showSplash, setShowSplash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only show splash once per session
    if (!sessionStorage.getItem("crackncode-splash")) {
      setShowSplash(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleSplashComplete = () => {
    sessionStorage.setItem("crackncode-splash", "1");
    setShowSplash(false);
  };

  // Prevent flash before mount
  if (!mounted) return null;

  return (
    <div className={dark ? "dark" : ""}>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {!showSplash && (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="min-h-screen pt-16"
            >
              {children}
            </motion.main>
          </AnimatePresence>
          <Footer />
          <WhatsAppButton />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: dark ? "#18181b" : "#ffffff",
                color: dark ? "#fafafa" : "#18181b",
                border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e4e4e7",
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
              },
            }}
          />
        </>
      )}
    </div>
  );
}
