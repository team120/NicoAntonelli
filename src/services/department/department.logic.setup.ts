import * as queries from "../../utils/common/common.query";
import * as departmentsLogic from "./department.logic";

export const getDepartments = departmentsLogic.getDepartmentsLogic(
  queries.getFromRepoQuery,
);

export const getOneDepartment = departmentsLogic.getOneDepartmentLogic(
  queries.getOneFromRepoQuery,
);

export const createDepartment = departmentsLogic.createDepartmentLogic(
  queries.createFromRepoQuery,
);
