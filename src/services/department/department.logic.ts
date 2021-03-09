import { plainToClass } from "class-transformer";
import { Department } from "../../entities/department/department.model";
import { DepartmentShowDto } from "../../entities/department/output/department.show.dto";
import * as queryTypes from "../../utils/common/common.query.interface";

export const getDepartmentsLogicFactory = (
  getQuery: queryTypes.getQueryFunc,
) => (): Promise<DepartmentShowDto[]> =>
  getQuery(Department, ["university"])
  .then((departments) =>
    departments.map((department) =>
      plainToClass(DepartmentShowDto, department),
    ),
  );

export const getOneDepartmentLogicFactory = (
  getOneQuery: queryTypes.getOneQueryFunc,
) => (id: number): Promise<DepartmentShowDto> =>
  getOneQuery(Department, id, ["university"])
  .then((department) =>
    plainToClass(DepartmentShowDto, department),
  );

export const createDepartmentLogicFactory = (
  getCreateQuery: queryTypes.createQueryFunc,
) => (department: Department) =>
  getCreateQuery(Department, department)
  .then((department) =>
    plainToClass(DepartmentShowDto, department),
  );
