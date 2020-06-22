import * as authLogicFactories from "./auth.logic";
import { saveQuery } from "../../utils/common/common.query";
import {
  checkIsEmailTaken,
  hashPassword,
  findUser,
  checkPassword,
  generateJwtToken,
} from "../../utils/auth/auth.utils";

export const registerLogic = authLogicFactories.registerLogicFactory(
  checkIsEmailTaken,
  hashPassword,
  saveQuery,
);

export const loginLogic = authLogicFactories.loginLogicFactory(
  findUser,
  checkPassword,
  generateJwtToken,
);
