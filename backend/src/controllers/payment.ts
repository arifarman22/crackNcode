import { Request, Response } from "express";
import prisma from "../config/db";

// Stripe payment intent creation (hook-ready)
export const createPaymentIntent = async (req: Request, res: Response) => {
  const { orderId } = req.body;

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) { res.status(404).json({ message: "Order not found" }); return; }

  // TODO: Replace with actual Stripe/SSLCommerz integration
  // const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  // const intent = await stripe.paymentIntents.create({ amount: order.total * 100, currency: 'usd' });

  res.json({
    orderId: order.id,
    amount: order.total,
    message: "Payment gateway hook ready - configure STRIPE_SECRET_KEY in .env",
  });
};

// Webhook handler for payment verification
export const paymentWebhook = async (req: Request, res: Response) => {
  // TODO: Verify webhook signature with env.STRIPE_WEBHOOK_SECRET
  const { orderId, status } = req.body;

  if (status === "succeeded") {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "PAID", paymentId: req.body.paymentId },
    });
  }

  res.json({ received: true });
};
