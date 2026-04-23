import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error";
import { sanitizeInput, preventParamPollution, blockSuspiciousPayloads, requestLogger } from "./middleware/security";

import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import serviceRoutes from "./routes/service";
import courseRoutes from "./routes/course";
import orderRoutes from "./routes/order";
import subscriptionRoutes from "./routes/subscription";
import adminRoutes from "./routes/admin";
import paymentRoutes from "./routes/payment";
import uploadRoutes from "./routes/upload";

const app = express();

// Trust proxy
app.set("trust proxy", 1);

// Request ID for tracing
app.use((req, _res, next) => {
  (req as any).requestId = crypto.randomUUID();
  next();
});

// Gzip compression
app.use(compression());

// Helmet — full security headers
app.use(helmet({
  contentSecurityPolicy: env.NODE_ENV === "production" ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", env.FRONTEND_URL],
    },
  } : false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xContentTypeOptions: true,
  xDnsPrefetchControl: { allow: false },
  xDownloadOptions: true,
  xFrameOptions: { action: "deny" },
  xPermittedCrossDomainPolicies: { permittedPolicies: "none" },
  xPoweredBy: false,
  xXssProtection: true,
}));

// CORS
const allowedOrigins = [
  env.FRONTEND_URL,
  env.FRONTEND_URL?.replace(/\/$/, ""),
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
}));

// Rate limits — tiered
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later" },
  keyGenerator: (req) => req.ip || "unknown",
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many auth attempts, please try again later" },
  keyGenerator: (req) => req.ip || "unknown",
});

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { message: "Too many write operations, please slow down" },
  keyGenerator: (req) => req.ip || "unknown",
});

app.use(globalLimiter);

// Body parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

// Security middleware
app.use(requestLogger);
app.use(sanitizeInput);
app.use(preventParamPollution);
app.use(blockSuspiciousPayloads);

// Cache headers for public GET routes
app.use("/api/products", (req, res, next) => {
  if (req.method === "GET") res.set("Cache-Control", "public, max-age=60, s-maxage=120");
  next();
});
app.use("/api/courses", (req, res, next) => {
  if (req.method === "GET") res.set("Cache-Control", "public, max-age=60, s-maxage=120");
  next();
});
app.use("/api/services", (req, res, next) => {
  if (req.method === "GET") res.set("Cache-Control", "public, max-age=60, s-maxage=120");
  next();
});

// Health check
app.get("/api/health", (_req, res) => {
  res.set("Cache-Control", "no-cache");
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/orders", writeLimiter, orderRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", writeLimiter, paymentRoutes);
app.use("/api/upload", writeLimiter, uploadRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use(errorHandler);

export default app;
