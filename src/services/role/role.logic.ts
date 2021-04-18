import { plainToClass } from "class-transformer";
import * as queryTypes from "../../utils/common/common.query.interface";
import { RoleShowDto } from "../../entities/role/output/role.show.dto";
import { Role } from "../../entities/role/role.model";
import { IFindRolesByProjectId } from "../../utils/role/role.utils";

export const getRolesLogic = (getRolesQuery: IFindRolesByProjectId) => async (
  id: number,
): Promise<RoleShowDto[]> =>
  getRolesQuery(id).then((roles) =>
    roles.map((role) => plainToClass(RoleShowDto, role)),
  );

// Para traer todos los roles con los permisos asociados, cuando un creador de grupo quiere editar custom roles
export const getRolesWithGrantsLogic = "";
