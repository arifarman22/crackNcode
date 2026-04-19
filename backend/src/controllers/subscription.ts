import { Request, Response } from "express";
import prisma from "../config/db";
import { asyncHandler } from "../middleware/error";

const paramId = (req: Request) => req.params.id as string;

export const getPlans = asyncHandler(async (_req: Request, res: Response) => {
  const plans = await prisma.plan.findMany({ where: { active: true }, orderBy: { price: "asc" } });
  res.json(plans);
});

export const createPlan = asyncHandler(async (req: Request, res: Response) => {
  const plan = await prisma.plan.create({ data: req.body });
  res.status(201).json(plan);
});

export const updatePlan = asyncHandler(async (req: Request, res: Response) => {
  const plan = await prisma.plan.update({ where: { id: paramId(req) }, data: req.body });
  res.json(plan);
});

export const deletePlan = asyncHandler(async (req: Request, res: Response) => {
  await prisma.plan.update({ where: { id: paramId(req) }, data: { active: false } });
  res.json({ message: "Plan deleted" });
});

export const getAllSubscriptions = asyncHandler(async (_req: Request, res: Response) => {
  const subs = await prisma.subscription.findMany({
    include: { user: { select: { id: true, name: true, email: true } }, plan: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(subs);
});

export const subscribe = asyncHandler(async (req: Request, res: Response) => {
  const { planId } = req.body;
  const userId = req.user!.userId;

  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) { res.status(404).json({ message: "Plan not found" }); return; }

  await prisma.subscription.updateMany({
    where: { userId, status: "ACTIVE" },
    data: { status: "CANCELLED" },
  });

  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + (plan.interval === "yearly" ? 12 : 1));

  const subscription = await prisma.subscription.create({
    data: { userId, planId, endDate },
    include: { plan: true },
  });

  res.status(201).json(subscription);
});

export const getMySubscription = asyncHandler(async (req: Request, res: Response) => {
  const subscription = await prisma.subscription.findFirst({
    where: { userId: req.user!.userId, status: "ACTIVE" },
    include: { plan: true },
  });
  res.json(subscription);
});
