import * as authLogic from "./auth.logic";
import * as queries from "../../utils/common/common.query";
import * as authUtils from "../../utils/auth/auth.utils";

export const registerLogic = authLogic.registerLogic(
  authUtils.checkIsEmailTaken,
  authUtils.hashPassword,
  queries.createFromRepoQuery,
);

export const loginLogic = authLogic.loginLogic(
  authUtils.findUser,
  authUtils.checkPassword,
  authUtils.generateJwtToken,
);

export const isAuthLogic = authLogic.isAuthLogic(
  authUtils.checkValidJwt,
  authUtils.getUserFromToken,
);

export const socialLoginLogic = authLogic.socialLoginLogic(
  authUtils.findUserFromProfile,
  authUtils.generateJwtToken,
  queries.createFromRepoQuery,
);
