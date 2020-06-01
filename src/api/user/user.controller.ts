import { Request, Response, NextFunction } from "express";
import { getUsers } from "../../services/users/user.logic.setup";

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => next(err));
};
