import { Request, Response, NextFunction } from "express";
import { LoggedUserDto } from "../entities/auth/output/login.output.dto";
import { plainToClass } from "class-transformer";
import { isAuthLogic } from "../services/auth/auth.logic.setup";

export const isAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = <string>req.headers["auth"];
  isAuthLogic(token)
    .then((user) => {
      const userLogged = plainToClass(LoggedUserDto, { ...user, token: token });
      req.userLogged = userLogged;
      next();
    })
    .catch((err) => next(err));
};
