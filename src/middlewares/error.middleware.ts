import { Request, Response, NextFunction } from "express";
import { AppError } from "../../src/utils/errors/errors";
import { Logger } from "winston";

export const errorHandlingMiddleware = (logger: Logger) => (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.log(err.logLevel ?? "error", err.message, {
    type: err.name,
    stack: err.stack,
  });

  const statusCode = err.status ?? 500;
  const displayMessage = err.displayMessage ?? "Ha surgido un error inesperado";
  res.status(statusCode).json({ message: displayMessage });
};
