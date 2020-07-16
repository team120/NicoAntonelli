import { Router } from "express";
import * as userActions from "./user.controller";
import { isAuthMiddleware } from "../../middlewares/isauth.middleware";

const userRouter = Router();

userRouter.get("", [isAuthMiddleware], userActions.getAllUsers);
userRouter.get("/:id", userActions.getOneUser);

export default userRouter;
