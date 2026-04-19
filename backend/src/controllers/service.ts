import { Request, Response } from "express";
import prisma from "../config/db";

const paramId = (req: Request) => req.params.id as string;

export const getServices = async (_req: Request, res: Response) => {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { price: "asc" } });
  res.json(services);
};

export const createService = async (req: Request, res: Response) => {
  const service = await prisma.service.create({ data: req.body });
  res.status(201).json(service);
};

export const updateService = async (req: Request, res: Response) => {
  const service = await prisma.service.update({ where: { id: paramId(req) }, data: req.body });
  res.json(service);
};

export const deleteService = async (req: Request, res: Response) => {
  await prisma.service.update({ where: { id: paramId(req) }, data: { active: false } });
  res.json({ message: "Service deleted" });
};
