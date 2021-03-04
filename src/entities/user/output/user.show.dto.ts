import { Exclude, Expose, Type } from "class-transformer";
import { UniversityShowDto } from "../../university/output/university.show.dto";

@Exclude()
export class UserShowDto {
  @Expose()
  name: string;
  @Expose()
  lastName: string;
  @Expose()
  mail: string;
  @Expose()
  @Type(() => UniversityShowDto)
  university: UniversityShowDto;
  @Expose()
  requestPosition: boolean;
}
