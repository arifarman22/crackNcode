import { z } from "zod/v4";

export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255).transform((e) => e.toLowerCase().trim()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128)
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export const loginSchema = z.object({
  email: z.string().email().max(255).transform((e) => e.toLowerCase().trim()),
  password: z.string().min(1).max(128),
});

export const productSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  price: z.number().positive().max(999999),
  image: z.string().url().max(500).optional().or(z.literal("")),
  category: z.string().min(1).max(50),
  type: z.enum(["DIGITAL", "PACKAGE"]).default("DIGITAL"),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  features: z.array(z.string().max(200)).min(1).max(20),
  price: z.number().positive().max(999999),
  tier: z.string().min(1).max(50),
});

export const courseSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  price: z.number().positive().max(999999),
  image: z.string().url().max(500).optional().or(z.literal("")),
  duration: z.string().min(1).max(50),
  level: z.string().min(1).max(50),
  modules: z.number().int().positive().max(1000),
});

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1).max(100),
        quantity: z.number().int().positive().max(100),
      })
    )
    .min(1)
    .max(50),
});

export const planSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive().max(999999),
  interval: z.enum(["monthly", "yearly"]),
  features: z.array(z.string().max(200)).min(1).max(20),
  highlighted: z.boolean().default(false),
});

export const subscribeSchema = z.object({
  planId: z.string().min(1).max(100),
});
