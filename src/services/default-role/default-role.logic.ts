import { plainToClass } from "class-transformer";
import { IFindDefaultRoles } from "../../utils/default-role/default-role.utils";
import { DefaultRole } from "../../entities/default-role/default-role.model";
import { DefaultRoleDto } from "../../entities/default-role/output/default-role.show.dto";

import * as queryTypes from "../../utils/common/common.query.interface";
import { DefaultRoleFindDto } from "../../entities/default-role/input/default-role.find.dto";

export const getDefaultRolesLogic = (
  getRolesQuery: IFindDefaultRoles,
) => async (whereValues: DefaultRoleFindDto): Promise<DefaultRoleDto[]> =>
  getRolesQuery(whereValues).then((defaultRoles) =>
    defaultRoles.map((defaultRole) =>
      plainToClass(DefaultRoleDto, defaultRole),
    ),
  );

export const getOneDefaultRoleLogic = (
  getOneQuery: queryTypes.getOneQueryFunc,
) => (id: number): Promise<DefaultRoleDto> =>
  getOneQuery(DefaultRole, id, ["grants"]).then((defaultRole) =>
    plainToClass(DefaultRoleDto, defaultRole),
  );
