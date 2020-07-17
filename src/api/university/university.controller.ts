import { Request, Response, NextFunction } from "express";
import * as universityServices from "../../services/university/university.logic.setup";

export const getAllUniversities = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  universityServices
    .getUniversities()
    .then((universities) => {
      res.status(200).json(universities);
    })
    .catch((err) => next(err));
};

export const getOneUniversity = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  universityServices
    .getOneUniversity(Number(req.params.id))
    .then((university) => {
      res.status(200).json(university);
    })
    .catch((err) => next(err));
};
