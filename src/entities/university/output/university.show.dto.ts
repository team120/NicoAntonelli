import { Exclude, Expose } from "class-transformer";
import { DepartmentShowDto } from "../../../entities/department/output/department.show.dto";

@Exclude()
export class UniversityShowDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  departments: DepartmentShowDto;
}
