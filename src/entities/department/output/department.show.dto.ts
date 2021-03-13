import { Exclude, Expose, Type } from "class-transformer";
import { UniversityShowDto } from "../../../entities/university/output/university.show.dto";

@Exclude()
export class DepartmentShowDto {
  @Expose()
  name: string;
  @Expose()
  @Type(() => UniversityShowDto)
  university: UniversityShowDto
}
