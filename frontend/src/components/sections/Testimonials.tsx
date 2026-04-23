"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Send, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { api } from "@/lib/utils";
import { useAuthStore } from "@/store";
import toast from "react-hot-toast";

interface Review {
  id: string;
  rating: number;
  content: string;
  createdAt: string;
  user: { name: string };
}

const colors = [
  "from-brand-500 to-cyan-500",
  "from-pink-500 to-rose-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-orange-400",
  "from-violet-500 to-purple-400",
  "from-cyan-500 to-blue-400",
];

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange?.(i)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            size={onChange ? 22 : 14}
            className={`transition-colors duration-200 ${
              i <= value ? "fill-amber-400 text-amber-400" : "text-zinc-300 dark:text-zinc-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    api<Review[]>("/reviews")
      .then(setReviews)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || content.length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }
    setSubmitting(true);
    try {
      await api("/reviews", {
        method: "POST",
        body: JSON.stringify({ rating, content: content.trim() }),
      });
      setSubmitted(true);
      setContent("");
      setRating(5);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit");
    }
    setSubmitting(false);
  };

  return (
    <section className="section-padding">
      <SectionHeading
        tag="Testimonials"
        title="What Our Clients Say"
        description="Real feedback from real people who trusted us with their digital growth."
      />

      {/* Reviews Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-zinc-100 dark:bg-zinc-800 h-64 animate-pulse" />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <AnimatedSection key={r.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.4 } }}
                className="h-full flex flex-col rounded-2xl p-6 sm:p-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-soft dark:shadow-dark-soft hover:shadow-soft-lg dark:hover:shadow-glow hover:border-brand-200 dark:hover:border-brand-500/30 transition-all duration-500"
              >
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote size={28} className="text-brand-200 dark:text-brand-800" />
                </div>

                {/* Stars */}
                <div className="mb-4">
                  <StarRating value={r.rating} />
                </div>

                {/* Content */}
                <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed flex-1 mb-6">
                  &ldquo;{r.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center text-white text-sm font-semibold shadow-md`}>
                    {r.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{r.user.name}</div>
                    <div className="text-xs text-zinc-400">{new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-400 mb-2">No reviews yet. Be the first!</p>
        </div>
      )}

      {/* Write a Review */}
      <AnimatedSection delay={0.3} className="mt-12">
        <div className="max-w-2xl mx-auto">
          {!user ? (
            <div className="text-center rounded-2xl p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-3">Want to share your experience?</p>
              <Button size="sm" onClick={() => window.location.href = "/auth/login"}>Sign in to write a review</Button>
            </div>
          ) : submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center rounded-2xl p-8 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20"
            >
              <CheckCircle size={32} className="text-emerald-500 mx-auto mb-3" />
              <p className="font-medium text-emerald-700 dark:text-emerald-400">Thank you for your review!</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-1">It will appear after admin approval.</p>
            </motion.div>
          ) : (
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-soft dark:shadow-dark-soft">
              <h3 className="text-lg font-semibold mb-1">Share Your Experience</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Your review helps others make better decisions.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Your Rating</label>
                  <StarRating value={rating} onChange={setRating} />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Your Review</label>
                  <textarea
                    placeholder="Tell us about your experience working with CrackNCode..."
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all resize-none"
                  />
                  <p className="text-xs text-zinc-400 mt-1 text-right">{content.length}/500</p>
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Submitting..." : <><Send size={16} /> Submit Review</>}
                </Button>
              </form>
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
