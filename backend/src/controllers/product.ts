import { Request, Response } from "express";
import prisma from "../config/db";
import { asyncHandler } from "../middleware/error";
import { getPagination, paginatedResponse } from "../utils/pagination";
import { cache } from "../utils/cache";

const paramId = (req: Request) => req.params.id as string;

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { category, type, search, sort } = req.query;
  const pg = getPagination(req);

  // Build cache key from query params
  const cacheKey = `products:${JSON.stringify({ category, type, search, sort, ...pg })}`;
  const cached = cache.get(cacheKey);
  if (cached) { res.json(cached); return; }

  const where: any = { active: true };
  if (category && category !== "all") where.category = String(category);
  if (type) where.type = String(type);
  if (search) where.name = { contains: String(search), mode: "insensitive" };

  // Sort options
  let orderBy: any = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { price: "asc" };
  else if (sort === "price_desc") orderBy = { price: "desc" };
  else if (sort === "name") orderBy = { name: "asc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip: pg.skip, take: pg.limit }),
    prisma.product.count({ where }),
  ]);

  const result = paginatedResponse(products, total, pg);
  cache.set(cacheKey, result, 60); // cache 60s
  res.json(result);
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = paramId(req);
  const cacheKey = `product:${id}`;
  const cached = cache.get(cacheKey);
  if (cached) { res.json(cached); return; }

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || !product.active) { res.status(404).json({ message: "Product not found" }); return; }

  cache.set(cacheKey, product, 120);
  res.json(product);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await prisma.product.create({ data: req.body });
  cache.invalidate("products:");
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = paramId(req);
  const product = await prisma.product.update({ where: { id }, data: req.body });
  cache.invalidate("products:");
  cache.invalidate(`product:${id}`);
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = paramId(req);
  await prisma.product.update({ where: { id }, data: { active: false } });
  cache.invalidate("products:");
  cache.invalidate(`product:${id}`);
  res.json({ message: "Product deleted" });
});
