import { getRepository } from "typeorm";
import { User } from "../../entities/user/user.model";
import * as Err from "../errors/error.variants";
import {
  checkIsEmailTakenFunc,
  findUserFunc,
  checkPasswordFunc,
} from "./auth.utils.interface";
import * as argon2 from "argon2";

export const checkIsEmailTaken: checkIsEmailTakenFunc = (
  mail: string,
): Promise<void> =>
  getRepository(User)
    .findOne({ mail: mail })
    .then((user) => {
      if (user !== undefined) {
        throw Err.MailAlreadyTaken(mail);
      }
    });

export const findUser: findUserFunc = (mail: string) =>
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

export const checkPassword: checkPasswordFunc = (
  password: string,
  storedPassword: string,
): Promise<boolean> =>
  argon2.verify(storedPassword, password).then((result) => {
    if (result === false) {
      throw Err.IncorrectPassword();
    }
    return result;
  });
