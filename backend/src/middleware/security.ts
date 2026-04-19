import { Request, Response, NextFunction } from "express";

// Deep sanitize all string values to prevent XSS
function sanitize(obj: any): any {
  if (typeof obj === "string") {
    return obj
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      .trim();
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

// Block suspicious payloads (SQL injection patterns, NoSQL injection)
export const blockSuspiciousPayloads = (req: Request, res: Response, next: NextFunction): void => {
  const body = JSON.stringify(req.body || {});
  const query = JSON.stringify(req.query || {});
  const combined = body + query;

  const sqlPatterns = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC)\b.*\b(FROM|INTO|TABLE|WHERE|SET)\b)|(-{2})|(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i;
  const nosqlPatterns = /\$(?:gt|gte|lt|lte|ne|in|nin|regex|where|exists)/i;

  if (sqlPatterns.test(combined) || nosqlPatterns.test(combined)) {
    res.status(400).json({ message: "Malicious request detected" });
    return;
  }
  next();
};

// Request logger for audit trail
export const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} — ${req.ip}`);
  }
  next();
};

// Block requests with no user-agent (bots)
export const blockNoUserAgent = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers["user-agent"]) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  next();
};
