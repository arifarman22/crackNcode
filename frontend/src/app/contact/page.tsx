"use client";
import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // API ready - replace with actual endpoint
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors";

  return (
    <section className="section-padding">
      <AnimatedSection className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
          Contact
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">Have a project in mind? Let&apos;s talk about it.</p>
      </AnimatedSection>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatedSection>
            <GlassCard hover={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                  <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                </div>
                <input type="text" placeholder="Subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass} />
                <textarea placeholder="Your Message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </GlassCard>
          </AnimatedSection>
        </div>

        <div className="space-y-4">
          <AnimatedSection delay={0.1}>
            <GlassCard>
              <Mail size={20} className="text-brand-400 mb-2" />
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-gray-400 text-sm">hello@crackncode.com</p>
            </GlassCard>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <GlassCard>
              <MapPin size={20} className="text-brand-400 mb-2" />
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-gray-400 text-sm">Dhaka, Bangladesh</p>
            </GlassCard>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <GlassCard>
              <Phone size={20} className="text-brand-400 mb-2" />
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-gray-400 text-sm">+880 1613-201747</p>
            </GlassCard>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <a
              href="https://wa.me/8801613201747?text=Hi%20CrackNCode!"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <GlassCard className="!bg-green-500/10 !border-green-500/30 cursor-pointer">
                <MessageCircle size={20} className="text-green-400 mb-2" />
                <h3 className="font-semibold mb-1">WhatsApp</h3>
                <p className="text-gray-400 text-sm">Chat with us instantly</p>
              </GlassCard>
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
