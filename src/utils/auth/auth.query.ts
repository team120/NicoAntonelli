import { getRepository } from "typeorm";
import { User } from "../../entities/user/user.model";
import * as Err from "../errors/errors";
import { checkIsEmailTakenFunc } from "./auth.query.interface";

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
