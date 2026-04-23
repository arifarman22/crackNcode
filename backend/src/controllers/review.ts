import { Request, Response } from "express";
import prisma from "../config/db";
import { asyncHandler } from "../middleware/error";

// Public: get approved reviews
export const getReviews = asyncHandler(async (_req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  res.json(reviews);
});

// Authenticated: submit a review
export const createReview = asyncHandler(async (req: Request, res: Response) => {
  const { rating, content } = req.body;
  const userId = req.user!.userId;

  // Check if user already reviewed
  const existing = await prisma.review.findFirst({ where: { userId } });
  if (existing) {
    res.status(409).json({ message: "You have already submitted a review" });
    return;
  }

  const review = await prisma.review.create({
    data: { userId, rating: Math.min(5, Math.max(1, rating)), content },
    include: { user: { select: { name: true } } },
  });

  res.status(201).json({ ...review, message: "Review submitted! It will appear after admin approval." });
});

// Admin: get all reviews (including unapproved)
export const getAllReviews = asyncHandler(async (_req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(reviews);
});

// Admin: approve a review
export const approveReview = asyncHandler(async (req: Request, res: Response) => {
  const review = await prisma.review.update({
    where: { id: req.params.id as string },
    data: { approved: true },
  });
  res.json(review);
});

// Admin: delete a review
export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
  await prisma.review.delete({ where: { id: req.params.id as string } });
  res.json({ message: "Review deleted" });
});
