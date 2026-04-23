"use client";
import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle, Clock, Send } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const input = "w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all";

  return (
    <>
      <section className="section-padding">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 mb-4">
            Contact
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Have a project in mind? We&apos;d love to hear about it. Fill out the form below or reach out directly — we typically respond within 24 hours.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <GlassCard hover={false}>
                <h3 className="text-lg font-semibold mb-1">Send Us a Message</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Fill out the form and we&apos;ll get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Your Name *</label>
                      <input type="text" placeholder="John Doe" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Your Email *</label>
                      <input type="email" placeholder="john@example.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Subject *</label>
                    <input type="text" placeholder="Project inquiry" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={input} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Message *</label>
                    <textarea placeholder="Tell us about your project, goals, and timeline..." required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${input} resize-none`} />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : <><Send size={16} /> Send Message</>}
                  </Button>
                </form>
              </GlassCard>
            </AnimatedSection>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <AnimatedSection delay={0.1}>
              <GlassCard>
                <Mail size={20} className="text-brand-500 mb-3" />
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">hello@crackncode.com</p>
                <p className="text-zinc-400 text-xs mt-1">We reply within 24 hours</p>
              </GlassCard>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <GlassCard>
                <Phone size={20} className="text-brand-500 mb-3" />
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">+880 1613-201747</p>
                <p className="text-zinc-400 text-xs mt-1">Sat - Thu, 10AM - 8PM BST</p>
              </GlassCard>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <GlassCard>
                <MapPin size={20} className="text-brand-500 mb-3" />
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Dhaka, Bangladesh</p>
                <p className="text-zinc-400 text-xs mt-1">Serving clients worldwide</p>
              </GlassCard>
            </AnimatedSection>
            <AnimatedSection delay={0.25}>
              <GlassCard>
                <Clock size={20} className="text-brand-500 mb-3" />
                <h3 className="font-semibold mb-1">Office Hours</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Sat - Thu: 10AM - 8PM</p>
                <p className="text-zinc-400 text-xs mt-1">Friday: Closed</p>
              </GlassCard>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <a href="https://wa.me/8801613201747?text=Hi%20CrackNCode!" target="_blank" rel="noopener noreferrer" className="block">
                <GlassCard className="!bg-emerald-50 dark:!bg-emerald-500/5 !border-emerald-200 dark:!border-emerald-500/20 cursor-pointer">
                  <MessageCircle size={20} className="text-emerald-500 mb-3" />
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">Chat with us instantly</p>
                  <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-1 font-medium">Usually replies in minutes →</p>
                </GlassCard>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ for Contact */}
      <section className="section-padding !pt-0">
        <SectionHeading tag="Common Questions" title="Before You Reach Out" />
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
          {[
            { q: "How quickly do you respond?", a: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, WhatsApp is the fastest way to reach us." },
            { q: "Do you offer free consultations?", a: "Yes! We offer a free 30-minute consultation call to discuss your project, understand your goals, and provide initial recommendations." },
            { q: "Can you work with my budget?", a: "We work with businesses of all sizes. Share your budget and we'll find the best solution that delivers maximum value within your range." },
            { q: "Do you work with international clients?", a: "Absolutely! We serve clients worldwide. All communication is in English and we're flexible with time zones for meetings." },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <GlassCard className="h-full">
                <h4 className="font-semibold text-sm mb-2">{item.q}</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.a}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
