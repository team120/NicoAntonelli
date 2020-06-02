import { Exclude, Expose } from "class-transformer";
import { University } from "src/entities/university/university.model";

@Exclude()
export class UserShowDto {
  @Expose()
  name: string;
  @Expose()
  lastName: string;
  @Expose()
  mail: string;
  //UniversityShowDTO needed in order to expose it
  //@Expose()
  //university: University;
}
