import * as queries from "../../utils/common/common.query";
import * as defaultRolesLogic from "./default-role.logic";
import { findDefaultRoles } from "../../utils/default-role/default-role.utils";

export const getDefaultRoles = defaultRolesLogic.getDefaultRolesLogic(
  findDefaultRoles,
);

export const getOneDefaultRole = defaultRolesLogic.getOneDefaultRoleLogic(
  queries.getOneFromRepoQuery,
);
