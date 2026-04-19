import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db";
import { env } from "../config/env";
import { sendWelcomeEmail } from "../services/email";

const signToken = (userId: string, role: string) =>
  jwt.sign({ userId, role }, env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 7, // 7 days in seconds
  });

export const register = async (req: Request, res: Response) => {
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
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = signToken(user.id, user.role);

  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  });
};

export const getProfile = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
};
