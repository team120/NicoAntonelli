import { Router } from "express";
import * as authActions from "./auth.controller";
import { RegisterInputDto } from "../../entities/auth/input/register.input.dto";
import { sanitizeWith } from "../../middlewares/sanitization.middleware";
import { validateWith } from "../../middlewares/validation.middleware";
import { LoginInputDto } from "../../entities/auth/input/login.input.dto";

const authRouter = Router();

authRouter.post(
  "/register",
  [sanitizeWith(RegisterInputDto), validateWith(RegisterInputDto, "body")],
  authActions.register,
);

authRouter.post(
  "/login",
  [sanitizeWith(LoginInputDto), validateWith(LoginInputDto, "body")],
  authActions.login,
);

export default authRouter;
