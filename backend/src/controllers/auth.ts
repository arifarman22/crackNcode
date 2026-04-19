import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db";
import { env } from "../config/env";
import { sendWelcomeEmail } from "../services/email";
import { asyncHandler } from "../middleware/error";

const signToken = (userId: string, role: string) =>
  jwt.sign({ userId, role }, env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });

// In-memory login attempt tracker (use Redis in production)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 min

function checkBruteForce(key: string): boolean {
  const record = loginAttempts.get(key);
  if (!record) return false;
  if (Date.now() - record.lastAttempt > LOCKOUT_MS) {
    loginAttempts.delete(key);
    return false;
  }
  return record.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(key: string) {
  const record = loginAttempts.get(key) || { count: 0, lastAttempt: 0 };
  record.count++;
  record.lastAttempt = Date.now();
  loginAttempts.set(key, record);
}

function clearAttempts(key: string) {
  loginAttempts.delete(key);
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    res.status(409).json({ message: "Email already registered" });
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
    select: { id: true, name: true, email: true, role: true },
  });

  const token = signToken(user.id, user.role);
  sendWelcomeEmail(email, name).catch(console.error);

  res.status(201).json({ user, token });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const ip = req.ip || "unknown";
  const bruteKey = `${ip}:${email}`;

  // Check brute force lockout
  if (checkBruteForce(bruteKey)) {
    res.status(429).json({ message: "Too many failed attempts. Try again in 15 minutes." });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Constant-time comparison: always hash even if user not found
  if (!user) {
    await bcrypt.hash(password, 12); // prevent timing attack
    recordFailedAttempt(bruteKey);
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    recordFailedAttempt(bruteKey);
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  clearAttempts(bruteKey);
  const token = signToken(user.id, user.role);

  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
});
