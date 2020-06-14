import * as userLogicFactories from "./user.logic";
import * as queries from "../../utils/common/common.query";

export const getUsers = userLogicFactories.getUsersLogicFactory(
  queries.getFromRepoQuery,
);

export const getOneUser = userLogicFactories.getOneUserLogicFactory(
  queries.getOneFromRepoQuery,
);
