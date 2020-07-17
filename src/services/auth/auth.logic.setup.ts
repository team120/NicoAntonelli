import * as authLogicFactories from "./auth.logic";
import { saveFromRepoQuery } from "../../utils/common/common.query";
import {
  checkIsEmailTaken,
  hashPassword,
  findUser,
  checkPassword,
  generateJwtToken,
  checkValidJwt,
  getUserFromToken,
} from "../../utils/auth/auth.utils";

export const registerLogic = authLogicFactories.registerLogicFactory(
  checkIsEmailTaken,
  hashPassword,
  saveFromRepoQuery,
);

export const loginLogic = authLogicFactories.loginLogicFactory(
  findUser,
  checkPassword,
  generateJwtToken,
);

export const isAuthLogic = authLogicFactories.isAuthLogicFactory(
  checkValidJwt,
  getUserFromToken,
);
