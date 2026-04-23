import prisma from "./config/db";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Seeding database...");

  // ===== ADMIN USER =====
  const adminPassword = await bcrypt.hash("Admin@123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@crackncode.com" },
    update: { password: adminPassword, role: "ADMIN" },
    create: { name: "CrackNCode Admin", email: "admin@crackncode.com", password: adminPassword, role: "ADMIN" },
  });
  console.log("✅ Admin created: admin@crackncode.com / Admin@123");

  // ===== DEMO USER =====
  const userPassword = await bcrypt.hash("User@123", 12);
  const demoUser = await prisma.user.upsert({
    where: { email: "user@crackncode.com" },
    update: {},
    create: { name: "Demo User", email: "user@crackncode.com", password: userPassword, role: "USER" },
  });
  console.log("✅ Demo user created: user@crackncode.com / User@123");

  // ===== PRODUCTS =====
  const products = [
    { id: "prod-smk", name: "Social Media Starter Kit", description: "Complete social media templates and strategy guide", price: 29, category: "marketing", type: "DIGITAL" as const },
    { id: "prod-brand", name: "Brand Identity Package", description: "Logo, color palette, typography, and brand guidelines", price: 149, category: "design", type: "PACKAGE" as const },
    { id: "prod-seo", name: "SEO Mastery Toolkit", description: "Keyword research templates, audit checklists", price: 49, category: "marketing", type: "DIGITAL" as const },
    { id: "prod-web", name: "Website Development Bundle", description: "Full-stack website with hosting setup", price: 499, category: "development", type: "PACKAGE" as const },
    { id: "prod-content", name: "Content Calendar Pro", description: "12-month content planning system with AI prompts", price: 19, category: "marketing", type: "DIGITAL" as const },
    { id: "prod-ecom", name: "E-Commerce Launch Pack", description: "Complete store setup with payment integration", price: 299, category: "development", type: "PACKAGE" as const },
  ];
  for (const p of products) {
    await prisma.product.upsert({ where: { id: p.id }, update: p, create: p });
  }
  console.log(`✅ ${products.length} products seeded`);

  // ===== SERVICES =====
  await prisma.service.deleteMany();
  const services = [
    { title: "Starter", description: "Perfect for small projects", features: ["1 Landing Page", "Basic SEO", "Mobile Responsive", "3 Revisions", "Email Support"], price: 99, tier: "starter" },
    { title: "Professional", description: "For growing businesses", features: ["5 Pages Website", "Advanced SEO", "Custom Animations", "Social Media Setup", "Priority Support", "Analytics Dashboard"], price: 299, tier: "pro" },
    { title: "Enterprise", description: "Full-scale digital transformation", features: ["Unlimited Pages", "Full SEO Suite", "Custom Web App", "E-Commerce Integration", "24/7 Support", "Dedicated Manager", "Monthly Reports"], price: 799, tier: "enterprise" },
  ];
  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log(`✅ ${services.length} services seeded`);

  // ===== COURSES =====
  await prisma.course.deleteMany();
  const courses = [
    { title: "Web Development Bootcamp", description: "Learn HTML, CSS, JS, React, Node.js from scratch", price: 79, duration: "12 weeks", level: "beginner", modules: 48 },
    { title: "Digital Marketing Mastery", description: "Master SEO, social media, email marketing, paid ads", price: 59, duration: "8 weeks", level: "intermediate", modules: 32 },
    { title: "UI/UX Design Pro", description: "Design stunning interfaces with Figma", price: 69, duration: "10 weeks", level: "beginner", modules: 40 },
    { title: "Advanced React & Next.js", description: "Build production-grade apps with React ecosystem", price: 99, duration: "6 weeks", level: "advanced", modules: 24 },
  ];
  for (const c of courses) {
    await prisma.course.create({ data: c });
  }
  console.log(`✅ ${courses.length} courses seeded`);

  // ===== PLANS =====
  await prisma.subscription.deleteMany();
  await prisma.plan.deleteMany();
  const plans = [
    { id: "plan-basic", name: "Basic", price: 9, interval: "monthly", features: ["Access to basic courses", "Community forum", "Monthly newsletter", "Email support"] },
    { id: "plan-pro", name: "Pro", price: 29, interval: "monthly", features: ["All Basic features", "Premium courses", "1-on-1 mentoring (monthly)", "Project reviews", "Certificate of completion", "Priority support"], highlighted: true },
    { id: "plan-elite", name: "Elite", price: 79, interval: "monthly", features: ["All Pro features", "Unlimited mentoring", "Job placement support", "Exclusive workshops", "Early access to new content", "Custom learning path"] },
  ];
  for (const p of plans) {
    await prisma.plan.upsert({ where: { id: p.id }, update: p, create: p });
  }
  console.log(`✅ ${plans.length} plans seeded`);

  console.log("\n🎉 Seed complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Admin Login:  admin@crackncode.com / Admin@123");
  console.log("  User Login:   user@crackncode.com / User@123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
