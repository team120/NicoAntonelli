import { plainToClass } from "class-transformer";
import { UniversityShowDto } from "../../entities/university/output/university.show.dto";
import * as queryTypes from "../../utils/common/common.query.interface";
import { University } from "../../entities/university/university.model";

export const getUniversitiesLogicFactory = (
  getQuery: queryTypes.getQueryFunc,
) => (): Promise<UniversityShowDto[]> =>
  getQuery(University).then((universities) =>
    universities.map((university) => plainToClass(UniversityShowDto, university)),
  ); // Add Departments...

export const getOneUniversityLogicFactory = (
  getOneQuery: queryTypes.getOneQueryFunc,
) => (id: number): Promise<UniversityShowDto> =>
  getOneQuery(University, id).then((university) =>
    plainToClass(UniversityShowDto, university),
  ); // Add Departments...
