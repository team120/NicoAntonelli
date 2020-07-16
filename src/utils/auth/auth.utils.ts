import { getRepository } from "typeorm";
import { User } from "../../entities/user/user.model";
import * as Err from "../errors/errors";
import { checkIsEmailTakenFunc } from "./auth.utils.interface";
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

export const hashPassword = (password: string): Promise<string> =>
  argon2.hash(password);
