import { Router } from "express";
import { createPaymentIntent, paymentWebhook } from "../controllers/payment";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/create-intent", authenticate, createPaymentIntent);
router.post("/webhook", paymentWebhook);

export default router;
