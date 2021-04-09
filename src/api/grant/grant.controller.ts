import { NextFunction, Request, Response } from "express";
import * as grantService from "../../services/grant/grant.logic.setup";

export const getGrants = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
    grantService
    .getGrants()
    .then((grants) => {
      res.status(200).json(grants);
    })
    .catch((err) => next(err));
};

export const getOneGrant = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
    grantService
    .getOneGrant(Number(req.params.id))
    .then((grant) => {
      res.status(200).json(grant);
    })
    .catch((err) => next(err));
};