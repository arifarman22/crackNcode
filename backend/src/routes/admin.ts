import { Router } from "express";
import { getDashboardStats, getChartData, getUsers, updateUserRole } from "../controllers/admin";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

router.use(authenticate, requireAdmin);

router.get("/stats", getDashboardStats);
router.get("/charts", getChartData);
router.get("/users", getUsers);
router.patch("/users/:id/role", updateUserRole);

export default router;
