import { plainToClass } from "class-transformer";
import { UniversityShowDto } from "../../entities/university/output/university.show.dto";
import * as queryTypes from "../../utils/common/common.query.interface";
import { University } from "../../entities/university/university.model";

export const getUniversitiesLogic = (
  getQuery: queryTypes.getQueryFunc,
) => (): Promise<UniversityShowDto[]> =>
  getQuery(University).then((universities) =>
    universities.map((university) =>
      plainToClass(UniversityShowDto, university),
    ),
  );

export const getOneUniversityLogic = (
  getOneQuery: queryTypes.getOneQueryFunc,
) => (id: number): Promise<UniversityShowDto> =>
  getOneQuery(University, id).then((university) =>
    plainToClass(UniversityShowDto, university),
  );

export const createUniversityLogic = (
  getCreateQuery: queryTypes.createQueryFunc,
) => (university: University) =>
  getCreateQuery(University, university).then((university) =>
    plainToClass(UniversityShowDto, university),
  );

export const updateUniversityLogic = (
  getUpdateQuery: queryTypes.updateQueryFunc,
  getOneQuery: queryTypes.getOneQueryFunc,
) => (id: number, changes: any) =>
  getOneQuery(University, id).then((university) =>
    getUpdateQuery(University, university, changes).then((university) =>
      plainToClass(UniversityShowDto, university),
    ),
  );

export const deleteUniversityLogic = (
  deleteQuery: queryTypes.deleteQueryFunc,
  getOneQuery: queryTypes.getOneQueryFunc,
) => (id: number) =>
  getOneQuery(University, id).then(() => deleteQuery(University, id));
