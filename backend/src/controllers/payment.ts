import { Request, Response } from "express";
import prisma from "../config/db";
import { asyncHandler } from "../middleware/error";

export const createPaymentIntent = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.body;
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) { res.status(404).json({ message: "Order not found" }); return; }

  res.json({
    orderId: order.id,
    amount: order.total,
    message: "Payment gateway hook ready - configure STRIPE_SECRET_KEY in .env",
  });
});

export const paymentWebhook = asyncHandler(async (req: Request, res: Response) => {
  const { orderId, status } = req.body;
  if (status === "succeeded") {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "PAID", paymentId: req.body.paymentId },
    });
  }
  res.json({ received: true });
});
