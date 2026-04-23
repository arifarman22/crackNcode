"use client";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="section-padding">
      <AnimatedSection>
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 text-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="absolute inset-0 bg-mesh-light dark:bg-mesh-dark" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
              Join 500+ businesses that trust CrackNCode for their digital growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Start Your Project →</Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary" size="lg">View Pricing</Button>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
