import * as roleLogic from "./role.logic";
import { findRolesByProjectId } from "../../utils/role/role.utils";

export const getRolesByProjectId = roleLogic.getRolesLogic(findRolesByProjectId);
