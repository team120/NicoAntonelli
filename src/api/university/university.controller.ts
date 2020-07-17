import { Request, Response, NextFunction } from "express";
import * as universityServices from "../../services/university/university.logic.setup";
import { getRepository } from "typeorm";
import { University } from "src/entities/university/university.model";

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

// // Create --> To Fix
// export const createUniversity = (
//   req: Request,
//   res: Response,
//   next: NextFunction): void => {
//     universityServices
//     .saveUniversity(getRepository(University).create(req.body as University))
//     .then((university) => {
//       res.status(200).json(university);
//     })
//     .catch((err) => next(err));
// };

// Update --> To Fix
// export const updateUniversity = (
//   req: Request,
//   res: Response,
//   next: NextFunction): void => {
//     const university = await getRepository(University).findOne(Number(req.params.id))
//     .then((university) => {
//       if (university !=== undefined) {
//         universityServices
//         .saveUniversity(university)
//         .then((university) => {
//           res.status(200).json(university);
//         })
//         .catch((err) => next(err));
//       }
//       .catch((err) => next(err));
//     })
// };

// Delete
export const deleteUniversity = (
  req: Request,
  res: Response,
  next: NextFunction): void => {
    universityServices.deleteUniversity(Number(req.params.id))
    .then(() => {
      res.status(200);
    })
    .catch((err) => next(err));
};
