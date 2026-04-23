import { Request, Response } from "express";
import prisma from "../config/db";
import { asyncHandler } from "../middleware/error";
import { getPagination, paginatedResponse } from "../utils/pagination";
import { cache } from "../utils/cache";

const paramId = (req: Request) => req.params.id as string;

export const getCourses = asyncHandler(async (req: Request, res: Response) => {
  const { level, search, sort } = req.query;
  const pg = getPagination(req);

  const cacheKey = `courses:${JSON.stringify({ level, search, sort, ...pg })}`;
  const cached = cache.get(cacheKey);
  if (cached) { res.json(cached); return; }

  const where: any = { active: true };
  if (level && level !== "all") where.level = String(level);
  if (search) where.title = { contains: String(search), mode: "insensitive" };

  let orderBy: any = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { price: "asc" };
  else if (sort === "price_desc") orderBy = { price: "desc" };

  const [courses, total] = await Promise.all([
    prisma.course.findMany({ where, orderBy, skip: pg.skip, take: pg.limit }),
    prisma.course.count({ where }),
  ]);

  const result = paginatedResponse(courses, total, pg);
  cache.set(cacheKey, result, 60);
  res.json(result);
});

export const createCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await prisma.course.create({ data: req.body });
  cache.invalidate("courses:");
  res.status(201).json(course);
});

export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await prisma.course.update({ where: { id: paramId(req) }, data: req.body });
  cache.invalidate("courses:");
  res.json(course);
});

export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
  await prisma.course.update({ where: { id: paramId(req) }, data: { active: false } });
  cache.invalidate("courses:");
  res.json({ message: "Course deleted" });
});
