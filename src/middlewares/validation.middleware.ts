import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";

export const validateWith = <T>(
  type: { new (...args: any[]): T },
  property: "body" | "query" | "route",
) => (req: Request, res: Response, next: NextFunction): void => {
  const value = plainToClass(type, req[property]);
  validate(value).then((err) => {
    if (err.length === 0) {
      next();
    } else {
      res.status(400).json({
        error: {
          original: value,
          details: err.map((val) => ({ [val.property]: val.constraints })),
        },
      });
    }
  });
};
