import { Request, Response, NextFunction } from "express";
import { sanitizeAsync, sanitize } from "@neuralegion/class-sanitizer";
import { plainToClass } from "class-transformer";

export const sanitizeWith = <T>(type: { new (...args: any[]): T }) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const body = plainToClass(type, req.body);
  sanitize(body);

  req.body = body;

  next();
};
