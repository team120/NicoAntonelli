import * as authLogicFactories from "./auth.logic";
import * as queries from "../../utils/common/common.query";
import * as authUtils from "../../utils/auth/auth.utils";
import { query } from "express";

export const registerLogic = authLogicFactories.registerLogicFactory(
  authUtils.checkIsEmailTaken,
  authUtils.hashPassword,
  queries.createFromRepoQuery,
);

export const loginLogic = authLogicFactories.loginLogicFactory(
  authUtils.findUser,
  authUtils.checkPassword,
  authUtils.generateJwtToken,
);

export const isAuthLogic = authLogicFactories.isAuthLogicFactory(
  authUtils.checkValidJwt,
  authUtils.getUserFromToken,
);

export const socialLoginLogic = authLogicFactories.socialLoginLogicFactory(
  authUtils.findUserFromProfile,
  queries.createFromRepoQuery,
);
