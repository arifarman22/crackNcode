import { Request, Response } from "express";
import prisma from "../config/db";

export const getDashboardStats = async (_req: Request, res: Response) => {
  const [users, products, orders, revenue, activeSubscriptions, recentOrders, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: ["PAID", "COMPLETED"] } } }),
    prisma.subscription.count({ where: { status: "ACTIVE" } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
  ]);

  res.json({
    users,
    products,
    orders,
    revenue: revenue._sum.total || 0,
    activeSubscriptions,
    recentOrders,
    recentUsers,
  });
};

export const getChartData = async (_req: Request, res: Response) => {
  // Revenue by month (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: sixMonthsAgo }, status: { in: ["PAID", "COMPLETED"] } },
    select: { total: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const revenueByMonth: Record<string, number> = {};
  const ordersByMonth: Record<string, number> = {};

  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    revenueByMonth[key] = 0;
    ordersByMonth[key] = 0;
  }

  for (const o of orders) {
    const d = new Date(o.createdAt);
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    if (key in revenueByMonth) {
      revenueByMonth[key] += o.total;
      ordersByMonth[key]++;
    }
  }

  const revenueChart = Object.entries(revenueByMonth).map(([month, revenue]) => ({ month, revenue: Math.round(revenue * 100) / 100 }));
  const ordersChart = Object.entries(ordersByMonth).map(([month, count]) => ({ month, orders: count }));

  // Users by role
  const [adminCount, userCount] = await Promise.all([
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { role: "USER" } }),
  ]);

  // Orders by status
  const [pending, paid, completed, cancelled] = await Promise.all([
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.order.count({ where: { status: "COMPLETED" } }),
    prisma.order.count({ where: { status: "CANCELLED" } }),
  ]);

  // Products by category
  const productsByCategory = await prisma.product.groupBy({
    by: ["category"],
    where: { active: true },
    _count: true,
  });

  res.json({
    revenueChart,
    ordersChart,
    usersByRole: [
      { name: "Admin", value: adminCount },
      { name: "User", value: userCount },
    ],
    ordersByStatus: [
      { name: "Pending", value: pending },
      { name: "Paid", value: paid },
      { name: "Completed", value: completed },
      { name: "Cancelled", value: cancelled },
    ],
    productsByCategory: productsByCategory.map((p) => ({
      name: p.category,
      value: p._count,
    })),
  });
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(users);
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { role } = req.body;
  if (!["USER", "ADMIN"].includes(role)) {
    res.status(400).json({ message: "Invalid role" });
    return;
  }
  const user = await prisma.user.update({
    where: { id: req.params.id as string },
    data: { role },
    select: { id: true, name: true, email: true, role: true },
  });
  res.json(user);
};
