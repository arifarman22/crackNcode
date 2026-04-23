import Link from "next/link";
import { CheckCircle, ArrowRight, Mail, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

export default function OrderSuccessPage() {
  return (
    <section className="section-padding">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">Order Confirmed!</h1>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Thank you for your purchase. Your order has been received and is being processed. You&apos;ll receive a confirmation email shortly.
          </p>
        </AnimatedSection>

        {/* Next Steps */}
        <AnimatedSection delay={0.1} className="mb-8">
          <GlassCard hover={false}>
            <h3 className="font-semibold mb-4">What Happens Next?</h3>
            <div className="space-y-4">
              {[
                { step: "1", title: "Order Processing", desc: "We're preparing your digital products. This usually takes a few minutes." },
                { step: "2", title: "Email Confirmation", desc: "You'll receive an email with your order details and download links." },
                { step: "3", title: "Access Your Products", desc: "Check your dashboard to access all purchased products and resources." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-semibold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </AnimatedSection>

        {/* Actions */}
        <AnimatedSection delay={0.2} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full">View Dashboard <ArrowRight size={16} /></Button>
            </Link>
            <Link href="/shop" className="flex-1">
              <Button variant="secondary" className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </AnimatedSection>

        {/* Support */}
        <AnimatedSection delay={0.3}>
          <div className="rounded-2xl p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Need help with your order?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:hello@crackncode.com" className="inline-flex items-center justify-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:underline">
                <Mail size={14} /> hello@crackncode.com
              </a>
              <a href="https://wa.me/8801613201747" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
                <MessageCircle size={14} /> WhatsApp Support
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
