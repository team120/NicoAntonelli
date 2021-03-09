import { NextFunction, Request, Response } from "express";
import * as departmentServices from "../../services/department/department.logic.setup";
// Get All
export const getAllDepartments = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  departmentServices
    .getAllDepartments()
    .then((departments) => {
      res.status(200).json(departments);
    })
    .catch((err) => next(err));
};
