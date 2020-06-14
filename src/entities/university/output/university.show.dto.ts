import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UniversityShowDto {
  @Expose()
  name: string;
}
