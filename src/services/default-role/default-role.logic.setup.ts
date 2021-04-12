import * as queries from "../../utils/common/common.query";
import * as defaultRolesLogic from "./default-role.logic";

export const getDefaultRoles = defaultRolesLogic.getDefaultRolesLogic(
  queries.getFromRepoQuery,
);