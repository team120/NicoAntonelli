import * as queries from "../../utils/common/common.query";
import * as departmentsLogicFactory from "./department.logic";

export const getAllDepartments = departmentsLogicFactory.getDepartmentsLogicFactory(
  queries.getFromRepoQuery,
);

export const getOneDepartment = departmentsLogicFactory.getOneDepartmentLogicFactory(
  queries.getOneFromRepoQuery,
);