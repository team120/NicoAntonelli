import { plainToClass } from "class-transformer";
import { IFindDefaultRoles } from "../../utils/default-role/default-role.utils";
import { DefaultRole } from "../../entities/default-role/default-role.model";
import { DefaultRoleDto } from "../../entities/default-role/output/default-role.show.dto";

import * as queryTypes from "../../utils/common/common.query.interface";
import { DefaultRoleFindDto } from "../../entities/default-role/input/default-role.find.dto";

export const getDefaultRolesLogic = (
  findDefaultRolesQuery: IFindDefaultRoles,
) => async (whereValues: DefaultRoleFindDto): Promise<DefaultRoleDto[]> =>
  findDefaultRolesQuery(whereValues).then((defaultRoles) =>
    defaultRoles.map((defaultRole) =>
      plainToClass(DefaultRoleDto, defaultRole),
    ),
  );
