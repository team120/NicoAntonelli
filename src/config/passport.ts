import GoogleAuth from "passport-google-oauth20";
import passport from "passport";
import { env } from "./config";
import * as Err from "../utils/errors/error.variants";
import { socialLoginLogic } from "../services/auth/auth.logic.setup";
import { SocialLoginDto } from "../entities/auth/input/socialLogin.input.dto";
import { Request } from "express";
import { User } from "../entities/user/user.model";
import { getOneUser } from "../services/users/user.logic.setup";

export const initilizePassport = (): void => {
  passport.serializeUser((user: User, done) => {
    done(undefined, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    getOneUser(id)
      .then((user) => done(undefined, user))
      .catch((error) => done(error));
  });

  if (!env.googleAuth.clientId || !env.googleAuth.clientSecret) {
    throw Err.EnvError("Google client id or secret not found");
  }

  passport.use(
    new GoogleAuth.Strategy(
      {
        clientID: env.googleAuth.clientId,
        clientSecret: env.googleAuth.clientSecret,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
      },
      async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: GoogleAuth.Profile,
        done: GoogleAuth.VerifyCallback,
      ) => {
        const socialLoginParams: SocialLoginDto = {
          name: profile.name?.givenName,
          university: {
            id: 1,
          },
          mail:
            profile.emails === undefined ? undefined : profile.emails[0].value,
          picture:
            profile.photos === undefined ? undefined : profile.photos[0].value,
          googleProfile: { id: profile.id, refreshToken: refreshToken },
        };
        try {
          const user = await socialLoginLogic(socialLoginParams);
          done(undefined, user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );
};
