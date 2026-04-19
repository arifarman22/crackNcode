import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  // Known application errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  // Prisma errors
  if ((err as any).code === "P2002") {
    res.status(409).json({ message: "A record with this value already exists" });
    return;
  }
  if ((err as any).code === "P2025") {
    res.status(404).json({ message: "Record not found" });
    return;
  }

  // JSON parse errors
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ message: "Invalid JSON in request body" });
    return;
  }

  // Log in dev, hide in prod
  console.error("[ERROR]", err.message);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  res.status(500).json({ message: "Internal server error" });
};

// Wrap async route handlers to catch errors automatically
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
