import { NextFunction, Request, Response } from "express";
import { Department } from "src/entities/department/department.model";
import { DepartmentShowDto } from "src/entities/department/output/department.show.dto";
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

// Get one
export const getOneDepartment = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  departmentServices
    .getOneDepartment(Number(req.params.id))
    .then((department) => {
      res.status(200).json(department);
    })
    .catch((err) => next(err));
};

// Create department
export const createDepartment = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  departmentServices
    .createDepartment(req.body)
    .then((department) => {
      res.status(201).json(department);
    })
    .catch((err) => next(err));
};
