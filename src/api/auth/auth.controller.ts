import { Request, Response, NextFunction } from "express";
import * as authServices from "../../services/auth/auth.logic.setup";
import { plainToClass } from "class-transformer";
import { RegisterInputDto } from "../../entities/auth/input/register.input.dto";
import { LoginInputDto } from "../../entities/auth/input/login.input.dto";

export const register = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  authServices
    .registerLogic(plainToClass(RegisterInputDto, req.body))
    .then((registeredUser) => {
      res.status(201).json(registeredUser);
    })
    .catch((err) => next(err));
};

export const login = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  authServices
    .loginLogic(plainToClass(LoginInputDto, req.body))
    .then((loggedUser) => {
      res.status(200).json(loggedUser);
    })
    .catch((err) => next(err));
};

export const socialLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(200).json(req.userLogged);
};
