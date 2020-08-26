import { Router } from "express";
import * as authActions from "./auth.controller";
import { RegisterInputDto } from "../../entities/auth/input/register.input.dto";
import { sanitizeWith } from "../../middlewares/sanitization.middleware";
import { validateWith } from "../../middlewares/validation.middleware";
import { LoginInputDto } from "../../entities/auth/input/login.input.dto";
import passport from "passport";

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

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
    session: false,
  }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "google account linking failed",
  }),
  authActions.socialLogin,
);

export default authRouter;
