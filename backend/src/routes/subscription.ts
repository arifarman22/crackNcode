import { Router } from "express";
import { getPlans, createPlan, updatePlan, deletePlan, getAllSubscriptions, subscribe, getMySubscription } from "../controllers/subscription";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { planSchema, subscribeSchema } from "../validators";

const router = Router();

router.get("/plans", getPlans);
router.post("/plans", authenticate, requireAdmin, validate(planSchema), createPlan);
router.put("/plans/:id", authenticate, requireAdmin, validate(planSchema), updatePlan);
router.delete("/plans/:id", authenticate, requireAdmin, deletePlan);
router.get("/all", authenticate, requireAdmin, getAllSubscriptions);
router.post("/subscribe", authenticate, validate(subscribeSchema), subscribe);
router.get("/my", authenticate, getMySubscription);

export default router;
