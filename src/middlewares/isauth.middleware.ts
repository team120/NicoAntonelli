import { Request, Response, NextFunction } from "express";
import { checkValidJwt, attachUser } from ".././utils/auth/auth.utils";
import { User } from "../entities/user/user.model";
import { LoggedUserDto } from "../entities/auth/output/login.output.dto";
import { plainToClass } from "class-transformer";

export const isAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = <string>req.headers["auth"];
  const decodedToken = checkValidJwt(token);
  attachUser(decodedToken)
  .then(
    (user) => {
      const userLogged = plainToClass(LoggedUserDto, {...user, token: decodedToken});
      req.userLogged = userLogged;
    })
    .catch((err) => 
       console.log(err));
  next();
  };

