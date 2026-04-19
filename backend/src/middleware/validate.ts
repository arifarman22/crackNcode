import { Request, Response, NextFunction } from "express";
import { z } from "zod/v4";

export const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction): void => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: z.prettifyError(result.error),
    });
    return;
  }
  req.body = result.data;
  next();
};
