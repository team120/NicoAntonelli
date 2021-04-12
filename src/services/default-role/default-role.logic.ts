import { plainToClass } from "class-transformer";
import { DefaultRole } from "../../entities/default_role/default-role.model";
import { DefaultRoleDto } from "../../entities/default_role/output/default-role.show.dto";

import * as queryTypes from "../../utils/common/common.query.interface";

export const getDefaultRolesLogic = (
  getQuery: queryTypes.getQueryFunc,
) => (): Promise<DefaultRoleDto[]> =>
  getQuery(DefaultRole, ["grants"]).then((defaultRoles) =>
    defaultRoles.map((defaultRole) =>
      plainToClass(DefaultRoleDto, defaultRole),
    ),
  );
