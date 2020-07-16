import { Router } from "express";
import * as userActions from "./user.controller";

const userRouter = Router();

userRouter.get("", userActions.getAllUsers);
userRouter.get("/:id", userActions.getOneUser);

export default userRouter;
