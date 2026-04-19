"use client";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="section-padding">
      <AnimatedSection>
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 text-center">
          <div className="absolute inset-0 bg-brand-gradient opacity-10" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(107,0,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(107,0,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-[128px]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
              Join 500+ businesses that trust CrackNCode for their digital growth. Let&apos;s build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Start Your Project</Button>
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
