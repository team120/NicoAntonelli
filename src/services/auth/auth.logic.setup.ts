import * as authLogicFactories from "./auth.logic";
import { saveQuery } from "../../utils/common/common.query";
import { checkIsEmailTaken } from "../../utils/auth/auth.query";

export const registerLogic = authLogicFactories.registerLogicFactory(
  checkIsEmailTaken,
  saveQuery,
);
