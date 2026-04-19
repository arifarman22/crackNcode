import { Request, Response } from "express";
import prisma from "../config/db";
import { sendOrderConfirmation } from "../services/email";
import { asyncHandler } from "../middleware/error";

interface OrderItemInput { productId: string; quantity: number; }

const paramId = (req: Request) => req.params.id as string;

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { items } = req.body as { items: OrderItemInput[] };
  const userId = req.user!.userId;

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const productMap = new Map(products.map((p: { id: string; price: number }) => [p.id, p]));
  let total = 0;

  const orderItems = items.map((item) => {
    const product = productMap.get(item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    total += product.price * item.quantity;
    return { productId: item.productId, quantity: item.quantity, price: product.price };
  });

  const order = await prisma.order.create({
    data: { userId, total, items: { create: orderItems } },
    include: { items: { include: { product: true } } },
  });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user) sendOrderConfirmation(user.email, order.id, total).catch(console.error);

  res.status(201).json(order);
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user!.userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await prisma.order.findUnique({
    where: { id: paramId(req) },
    include: { items: { include: { product: true } }, user: { select: { id: true, name: true, email: true } } },
  });
  if (!order) { res.status(404).json({ message: "Order not found" }); return; }
  if (req.user!.role !== "ADMIN" && order.userId !== req.user!.userId) {
    res.status(403).json({ message: "Forbidden" }); return;
  }
  res.json(order);
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id: paramId(req) },
    data: { status },
    include: { items: { include: { product: true } } },
  });
  res.json(order);
});

export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.query;
  const where: Record<string, unknown> = {};
  if (status) where.status = String(status);
  const orders = await prisma.order.findMany({
    where,
    include: { user: { select: { id: true, name: true, email: true } }, items: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
});
