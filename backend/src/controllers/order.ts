import { Request, Response } from "express";
import prisma from "../config/db";
import { sendOrderConfirmation } from "../services/email";
import { asyncHandler } from "../middleware/error";
import { getPagination, paginatedResponse } from "../utils/pagination";

interface OrderItemInput { productId: string; quantity: number; }
const paramId = (req: Request) => req.params.id as string;

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { items } = req.body as { items: OrderItemInput[] };
  const userId = req.user!.userId;

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds }, active: true } });

  if (products.length !== productIds.length) {
    res.status(400).json({ message: "One or more products not found or inactive" });
    return;
  }

  const productMap = new Map(products.map((p: { id: string; price: number }) => [p.id, p]));
  let total = 0;

  const orderItems = items.map((item) => {
    const product = productMap.get(item.productId)!;
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
  const pg = getPagination(req, 10);
  const where = { userId: req.user!.userId };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
      skip: pg.skip,
      take: pg.limit,
    }),
    prisma.order.count({ where }),
  ]);

  res.json(paginatedResponse(orders, total, pg));
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
  const validStatuses = ["PENDING", "PAID", "COMPLETED", "CANCELLED"];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
    return;
  }
  const order = await prisma.order.update({
    where: { id: paramId(req) },
    data: { status },
    include: { items: { include: { product: true } } },
  });
  res.json(order);
});

export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.query;
  const pg = getPagination(req, 20);
  const where: any = {};
  if (status) where.status = String(status);

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true } }, items: true },
      orderBy: { createdAt: "desc" },
      skip: pg.skip,
      take: pg.limit,
    }),
    prisma.order.count({ where }),
  ]);

  res.json(paginatedResponse(orders, total, pg));
});
