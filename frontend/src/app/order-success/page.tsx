import Link from "next/link";
import { CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

export default function OrderSuccessPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <AnimatedSection className="max-w-md w-full text-center">
        <GlassCard hover={false}>
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-400 mb-6">
            Thank you for your purchase. You&apos;ll receive a confirmation email shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard"><Button>View Dashboard</Button></Link>
            <Link href="/shop"><Button variant="secondary">Continue Shopping</Button></Link>
          </div>
        </GlassCard>
      </AnimatedSection>
    </section>
  );
}
