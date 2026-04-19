import { Product, Service, Course, Plan, Testimonial } from "@/types";

export const products: Product[] = [
  { id: "1", name: "Social Media Starter Kit", description: "Complete social media templates and strategy guide", price: 29, image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop", category: "marketing", type: "digital" },
  { id: "2", name: "Brand Identity Package", description: "Logo, color palette, typography, and brand guidelines", price: 149, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop", category: "design", type: "package" },
  { id: "3", name: "SEO Mastery Toolkit", description: "Keyword research templates, audit checklists, and link building guides", price: 49, image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop", category: "marketing", type: "digital" },
  { id: "4", name: "Website Development Bundle", description: "Full-stack website with hosting setup and optimization", price: 499, image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop", category: "development", type: "package" },
  { id: "5", name: "Content Calendar Pro", description: "12-month content planning system with AI prompts", price: 19, image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop", category: "marketing", type: "digital" },
  { id: "6", name: "E-Commerce Launch Pack", description: "Complete store setup with payment integration", price: 299, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop", category: "development", type: "package" },
];

export const services: Service[] = [
  { id: "1", title: "Starter", description: "Perfect for individuals and small projects", features: ["1 Landing Page", "Basic SEO", "Mobile Responsive", "3 Revisions", "Email Support"], price: 99, tier: "starter" },
  { id: "2", title: "Professional", description: "For growing businesses that need more", features: ["5 Pages Website", "Advanced SEO", "Custom Animations", "Social Media Setup", "Priority Support", "Analytics Dashboard"], price: 299, tier: "pro" },
  { id: "3", title: "Enterprise", description: "Full-scale digital transformation", features: ["Unlimited Pages", "Full SEO Suite", "Custom Web App", "E-Commerce Integration", "24/7 Support", "Dedicated Manager", "Monthly Reports"], price: 799, tier: "enterprise" },
];

export const courses: Course[] = [
  { id: "1", title: "Web Development Bootcamp", description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch", price: 79, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop", duration: "12 weeks", level: "beginner", modules: 48 },
  { id: "2", title: "Digital Marketing Mastery", description: "Master SEO, social media, email marketing, and paid ads", price: 59, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop", duration: "8 weeks", level: "intermediate", modules: 32 },
  { id: "3", title: "UI/UX Design Pro", description: "Design stunning interfaces with Figma and modern principles", price: 69, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop", duration: "10 weeks", level: "beginner", modules: 40 },
  { id: "4", title: "Advanced React & Next.js", description: "Build production-grade apps with React ecosystem", price: 99, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop", duration: "6 weeks", level: "advanced", modules: 24 },
];

export const plans: Plan[] = [
  { id: "1", name: "Basic", price: 9, interval: "monthly", features: ["Access to basic courses", "Community forum", "Monthly newsletter", "Email support"] },
  { id: "2", name: "Pro", price: 29, interval: "monthly", features: ["All Basic features", "Premium courses", "1-on-1 mentoring (monthly)", "Project reviews", "Certificate of completion", "Priority support"], highlighted: true },
  { id: "3", name: "Elite", price: 79, interval: "monthly", features: ["All Pro features", "Unlimited mentoring", "Job placement support", "Exclusive workshops", "Early access to new content", "Custom learning path"] },
];

export const testimonials: Testimonial[] = [
  { id: "1", name: "Sarah Chen", role: "Startup Founder", content: "CrackNCode transformed our online presence. Revenue increased 300% in 3 months.", avatar: "/avatars/1.jpg", rating: 5 },
  { id: "2", name: "Marcus Johnson", role: "Marketing Director", content: "The best digital agency we've worked with. Professional, creative, and results-driven.", avatar: "/avatars/2.jpg", rating: 5 },
  { id: "3", name: "Aisha Patel", role: "E-Commerce Owner", content: "Their e-commerce solution doubled our conversion rate. Absolutely incredible work.", avatar: "/avatars/3.jpg", rating: 5 },
];

export const categories = ["all", "marketing", "design", "development"];
