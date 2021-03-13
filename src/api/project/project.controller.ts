import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { ProjectFindDto } from "../../entities/project/input/project.find.dto";
import * as projectService from "../../services/project/project.logic.setup";

export const getProjects = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  projectService
    .getProjects(plainToClass(ProjectFindDto, req.query))
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => next(err));
};
