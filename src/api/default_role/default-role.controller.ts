import { NextFunction, Request, Response } from "express";

import * as defaultRoleService from "../../services/default-role/default-role.logic.setup";

// Get All
export const getDefaultRoles = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
    defaultRoleService
    .getDefaultRoles()
    .then((defaultRoles) => {
      res.status(200).json(defaultRoles);
    })
    .catch((err) => next(err));
};