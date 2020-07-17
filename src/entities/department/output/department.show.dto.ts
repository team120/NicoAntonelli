import { Exclude, Expose } from "class-transformer";

@Exclude()
export class DepartmentShowDto {
  @Expose()
  name: string;
}
