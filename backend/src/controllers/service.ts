import { Request, Response } from "express";
import prisma from "../config/db";
import { asyncHandler } from "../middleware/error";

const paramId = (req: Request) => req.params.id as string;

export const getServices = asyncHandler(async (_req: Request, res: Response) => {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { price: "asc" } });
  res.json(services);
});

export const createService = asyncHandler(async (req: Request, res: Response) => {
  const service = await prisma.service.create({ data: req.body });
  res.status(201).json(service);
});

export const updateService = asyncHandler(async (req: Request, res: Response) => {
  const service = await prisma.service.update({ where: { id: paramId(req) }, data: req.body });
  res.json(service);
});

export const deleteService = asyncHandler(async (req: Request, res: Response) => {
  await prisma.service.update({ where: { id: paramId(req) }, data: { active: false } });
  res.json({ message: "Service deleted" });
});
