import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UniversityShowDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
}
