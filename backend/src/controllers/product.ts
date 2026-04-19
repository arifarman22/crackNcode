import { Request, Response } from "express";
import prisma from "../config/db";

const paramId = (req: Request) => req.params.id as string;

export const getProducts = async (req: Request, res: Response) => {
  const { category, type, search } = req.query;
  const where: Record<string, unknown> = { active: true };
  if (category) where.category = String(category);
  if (type) where.type = String(type);
  if (search) where.name = { contains: String(search), mode: "insensitive" };

  const products = await prisma.product.findMany({ where, orderBy: { createdAt: "desc" } });
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({ where: { id: paramId(req) } });
  if (!product) { res.status(404).json({ message: "Product not found" }); return; }
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({ data: req.body });
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.update({ where: { id: paramId(req) }, data: req.body });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await prisma.product.update({ where: { id: paramId(req) }, data: { active: false } });
  res.json({ message: "Product deleted" });
};
