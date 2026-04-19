import { z } from "zod/v4";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  image: z.string().optional(),
  category: z.string().min(1),
  type: z.enum(["DIGITAL", "PACKAGE"]).default("DIGITAL"),
});

export const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  features: z.array(z.string()),
  price: z.number().positive(),
  tier: z.string().min(1),
});

export const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  image: z.string().optional(),
  duration: z.string().min(1),
  level: z.string().min(1),
  modules: z.number().int().positive(),
});

export const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1),
});

export const planSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  interval: z.enum(["monthly", "yearly"]),
  features: z.array(z.string()),
  highlighted: z.boolean().default(false),
});

export const subscribeSchema = z.object({
  planId: z.string(),
});
