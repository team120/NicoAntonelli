import { Request, Response, NextFunction } from "express";

export const demo = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("ok");
};
