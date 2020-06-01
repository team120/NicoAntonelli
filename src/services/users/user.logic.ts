import { plainToClass } from "class-transformer";
import { UserShowDto } from "../../entities/user/output/user.show.dto";
import { getQueryFunc } from "../../utils/common/common.query.interface";
import { User } from "../../entities/user/user.model";

export const getUsersLogicFactory = (getQuery: getQueryFunc) => () =>
  getQuery(User).then((users) =>
    users.map((user) => plainToClass(UserShowDto, user)),
  );
