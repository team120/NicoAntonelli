import { Router } from "express";
import * as authActions from "./auth.controller";
import { RegisterInputDto } from "../../entities/auth/input/register.input.dto";
import { sanitizeWith } from "../../middlewares/sanitization.middleware";
import { validateWith } from "../../middlewares/validation.middleware";

const authRouter = Router();

authRouter.post(
  "/register",
  [sanitizeWith(RegisterInputDto), validateWith(RegisterInputDto, "body")],
  authActions.register,
);

export default authRouter;
