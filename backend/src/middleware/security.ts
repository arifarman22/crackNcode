import { Request, Response, NextFunction } from "express";

// Sanitize string values recursively to prevent XSS
function sanitize(obj: any): any {
  if (typeof obj === "string") {
    return obj.replace(/[<>]/g, "").trim();
  }
  if (Array.isArray(obj)) return obj.map(sanitize);
  if (obj && typeof obj === "object") {
    const clean: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
      clean[k] = sanitize(v);
    }
    return clean;
  }
  return obj;
}

export const sanitizeInput = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitize(req.body);
  }
  next();
};

// Prevent parameter pollution
export const preventParamPollution = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.query) {
    for (const [key, val] of Object.entries(req.query)) {
      if (Array.isArray(val)) {
        (req.query as any)[key] = val[val.length - 1];
      }
    }
  }
  next();
};
