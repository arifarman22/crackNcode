import { Router } from "express";
import { createOrder, getMyOrders, getOrder, updateOrderStatus, getAllOrders } from "../controllers/order";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { orderSchema } from "../validators";

const router = Router();

router.post("/", authenticate, validate(orderSchema), createOrder);
router.get("/my", authenticate, getMyOrders);
router.get("/all", authenticate, requireAdmin, getAllOrders);
router.get("/:id", authenticate, getOrder);
router.patch("/:id/status", authenticate, requireAdmin, updateOrderStatus);

export default router;
