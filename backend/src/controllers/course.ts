import { Request, Response } from "express";
import prisma from "../config/db";
import { asyncHandler } from "../middleware/error";

const paramId = (req: Request) => req.params.id as string;

export const getCourses = asyncHandler(async (_req: Request, res: Response) => {
  const courses = await prisma.course.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } });
  res.json(courses);
});

export const createCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await prisma.course.create({ data: req.body });
  res.status(201).json(course);
});

export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await prisma.course.update({ where: { id: paramId(req) }, data: req.body });
  res.json(course);
});

export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
  await prisma.course.update({ where: { id: paramId(req) }, data: { active: false } });
  res.json({ message: "Course deleted" });
});
