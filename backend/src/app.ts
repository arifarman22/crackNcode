import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error";
import { sanitizeInput, preventParamPollution, blockSuspiciousPayloads, requestLogger, blockNoUserAgent } from "./middleware/security";

import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import serviceRoutes from "./routes/service";
import courseRoutes from "./routes/course";
import orderRoutes from "./routes/order";
import subscriptionRoutes from "./routes/subscription";
import adminRoutes from "./routes/admin";
import paymentRoutes from "./routes/payment";

const app = express();

// Trust proxy (Vercel, Railway, etc.)
app.set("trust proxy", 1);

// Security headers (HSTS, X-Frame, X-Content-Type, etc.)
app.use(helmet({
  contentSecurityPolicy: env.NODE_ENV === "production" ? undefined : false,
  crossOriginEmbedderPolicy: false,
  hsts: { maxAge: 31536000, includeSubDomains: true },
}));

// CORS
const allowedOrigins = [
  env.FRONTEND_URL,
  env.FRONTEND_URL?.replace(/\/$/, ""),
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
}));

// Global rate limit: 100 req / 15 min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later" },
  keyGenerator: (req) => req.ip || "unknown",
}));

// Auth-specific rate limit: 10 req / 15 min
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many auth attempts, please try again later" },
  keyGenerator: (req) => req.ip || "unknown",
});

// Body parsing with strict size limits
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

// Security middleware chain
app.use(requestLogger);
app.use(sanitizeInput);
app.use(preventParamPollution);
app.use(blockSuspiciousPayloads);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

export default app;
