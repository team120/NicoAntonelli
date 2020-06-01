import { getUsersLogicFactory } from "./user.logic";
import { getFromRepoQuery } from "../../utils/common/common.query";

export const getUsers = getUsersLogicFactory(getFromRepoQuery);
