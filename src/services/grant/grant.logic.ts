import { plainToClass } from "class-transformer";
import { Grant } from "../../entities/grant/grant.model";
import { GrantShowDto } from "../../entities/grant/output/grant.show.dto";
import * as queryTypes from "../../utils/common/common.query.interface";

export const getGrantsLogic = (
  getQuery: queryTypes.getQueryFunc,
) => (): Promise<GrantShowDto[]> =>
  getQuery(Grant).then((grants) =>
  grants.map((grant) =>
      plainToClass(GrantShowDto, grant),
    ),
  );

export const getOneGrantLogic = (
  getOneQuery: queryTypes.getOneQueryFunc,
) => (id: number): Promise<GrantShowDto> =>
  getOneQuery(Grant, id).then((grant) =>
    plainToClass(GrantShowDto, grant),
  );

