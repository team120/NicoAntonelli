import { plainToClass } from "class-transformer";
import { Department } from "../../entities/department/department.model";
import { DepartmentShowDto } from "../../entities/department/output/department.show.dto";
import * as queryTypes from "../../utils/common/common.query.interface";

export const getDepartmentsLogicFactory = (
  getQuery: queryTypes.getQueryFunc,
) => (): Promise<DepartmentShowDto[]> =>
  getQuery(Department).then((departments) =>
    departments.map((department) =>
      plainToClass(DepartmentShowDto, department),
    ),
  );
