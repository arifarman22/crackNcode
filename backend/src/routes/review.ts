import { Router } from "express";
import { getReviews, createReview, getAllReviews, approveReview, deleteReview } from "../controllers/review";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getReviews); // public
router.post("/", authenticate, createReview); // authenticated users
router.get("/all", authenticate, requireAdmin, getAllReviews); // admin
router.patch("/:id/approve", authenticate, requireAdmin, approveReview); // admin
router.delete("/:id", authenticate, requireAdmin, deleteReview); // admin

export default router;
