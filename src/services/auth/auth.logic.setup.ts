import * as authLogicFactories from "./auth.logic";
import { saveQuery } from "../../utils/common/common.query";
import { checkIsEmailTaken, hashPassword } from "../../utils/auth/auth.utils";

export const registerLogic = authLogicFactories.registerLogicFactory(
  checkIsEmailTaken,
  hashPassword,
  saveQuery,
);
