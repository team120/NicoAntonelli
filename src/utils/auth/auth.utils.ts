import { getRepository } from "typeorm";
import { User } from "../../entities/user/user.model";
import * as Err from "../errors/error.variants";
import * as authFuncs from "./auth.utils.interface";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { env } from "../../config";

export const checkIsEmailTaken: authFuncs.checkIsEmailTakenFunc = (
  mail: string,
): Promise<void> =>
  getRepository(User)
    .findOne({ mail: mail })
    .then((user) => {
      if (user !== undefined) {
        throw Err.MailAlreadyTaken(mail);
      }
    });

export const findUser: authFuncs.findUserFunc = (mail: string) =>
  getRepository(User)
    .findOne({ mail: mail })
    .catch((err) => {
      throw Err.DbError(err.message, err.stack);
    })
    .then((user) => {
      if (user === undefined) {
        throw Err.NotFoundUser(mail);
      }

      return user;
    });

export const hashPassword = (password: string): Promise<string> =>
  argon2.hash(password);

export const checkPassword: authFuncs.checkPasswordFunc = (
  password: string,
  storedPassword: string,
): Promise<boolean> =>
  argon2.verify(storedPassword, password).then((result) => {
    if (result === false) {
      throw Err.IncorrectPassword();
    }
    return result;
  });

export const generateJwtToken: authFuncs.generateJwtFunc = (
  user: User,
): string => {
  if (env.jwtSecret === undefined) {
    throw Err.EnvError("Jwt secret not defined");
  }

  const signature = env.jwtSecret;
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      mail: user.mail,
    },
    signature,
    {
      expiresIn: "1h",
    },
  );
};

export const checkValidJwt: authFuncs.checkValidJwtFunc = (
  givenToken: string,
): string => {
  const secret = env.jwtSecret;
  let decodedToken: string;
  if (secret === undefined) {
    throw Err.EnvError("Jwt secret not defined");
  }
  try {
    decodedToken = <string>jwt.verify(givenToken, secret);
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    throw Err.Unauthorized();
  }
  console.log("Valid Token!! You can access this endpoint");
  return decodedToken;
};

export const attachUser: authFuncs.attachUserFunc = (
  userToken: string,
): Promise<User> => {
  const mail = JSON.parse(JSON.stringify(<string>userToken))["mail"];
  return findUser(mail);
};
