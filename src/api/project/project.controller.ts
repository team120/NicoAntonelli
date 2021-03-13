import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { ProjectFindDto } from "../../entities/project/input/project.find.dto";
import * as projectService from "../../services/project/project.logic.setup";

// Get All
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

// Get one
export const getOneProject = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  projectService
    .getOneProject(Number(req.params.id))
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => next(err));
};
