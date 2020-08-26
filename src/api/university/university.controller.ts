import { Request, Response, NextFunction } from "express";
import * as universityServices from "../../services/university/university.logic.setup";

// Get All
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

// Get One
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

// Create
export const createUniversity = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  universityServices
    .createUniversity(req.body)
    .then((university) => {
      res.status(200).json(university);
    })
    .catch((err) => next(err));
};

// Update
export const updateUniversity = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  universityServices
    .updateUniversity(Number(req.params.id), req.body)
    .then((university) => {
      res.status(200).json(university);
    })
    .catch((err) => next(err));
};

// Delete
export const deleteUniversity = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  universityServices
    .deleteUniversity(Number(req.params.id))
    .then(() => {
      res.status(200).json({"message": `Item ${req.params.id} deleted successfully`});
    })
    .catch((err) => next(err));
};
