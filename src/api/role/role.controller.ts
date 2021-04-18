import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { DefaultRoleFindDto } from "../../entities/default-role/input/default-role.find.dto";

import * as roleService from "../../services/role/role.logic.setup";

// Get All roles with given Project ID
export const getRolesByProjectId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  roleService
    .getRolesByProjectId(Number(req.params.projectId))
    .then((defaultRoles) => {
      res.status(200).json(defaultRoles);
    })
    .catch((err) => next(err));
};
