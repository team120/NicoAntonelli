import { plainToClass } from "class-transformer";
import { UserShowDto } from "../../entities/user/output/user.show.dto";
import * as queryTypes from "../../utils/common/common.query.interface";
import { User } from "../../entities/user/user.model";

export const getUsersLogicFactory = (
  getQuery: queryTypes.getQueryFunc,
) => (): Promise<UserShowDto[]> =>
  getQuery(User, ["university"]).then((users) =>
    users.map((user) => plainToClass(UserShowDto, user)),
  );

export const getOneUserLogicFactory = (
  getOneQuery: queryTypes.getOneQueryFunc,
) => (id: number): Promise<UserShowDto> =>
  getOneQuery(User, id, ["university"]).then((user) =>
    plainToClass(UserShowDto, user),
  );
