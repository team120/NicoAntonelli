import { NextFunction, Request, Response } from "express";
import * as projectService from "../../services/project/project.logic.setup";

export const getProjects = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  projectService
    .getProjects()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => next(err));
};
