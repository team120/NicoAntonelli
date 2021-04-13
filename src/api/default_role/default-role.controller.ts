import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { DefaultRoleFindDto } from "../../entities/default-role/input/default-role.find.dto";

import * as defaultRoleService from "../../services/default-role/default-role.logic.setup";

// Get All
export const getDefaultRoles = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
    defaultRoleService
    .getDefaultRoles(plainToClass(DefaultRoleFindDto, req.query))
    .then((defaultRoles) => {
      res.status(200).json(defaultRoles);
    })
    .catch((err) => next(err));
};