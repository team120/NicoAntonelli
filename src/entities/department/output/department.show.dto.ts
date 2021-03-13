import { Exclude, Expose, Type } from "class-transformer";
import { UniversityShowDto } from "../../../entities/university/output/university.show.dto";

@Exclude()
export class DepartmentShowDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  @Type(() => UniversityShowDto)
  university: UniversityShowDto;
}
