import { Request, Response, NextFunction } from "express";
import { checkValidJwt } from "src/utils/auth/auth.utils";

export const isAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    checkValidJwt(req, res, next);
    next();
}