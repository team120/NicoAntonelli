import { Request, Response, NextFunction } from "express";
import { AppError } from "../../src/utils/errors/errors";
import { Logger } from "winston";

export const errorHandlingMiddleware = (logger: Logger) => (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.log(err.logLevel, err.message, {
    type: err.name,
    stack: err.stack,
  });

  res.status(err.status).json({ message: err.displayMessage });
};
