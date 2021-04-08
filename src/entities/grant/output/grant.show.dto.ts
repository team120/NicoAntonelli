import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class GrantShowDto {
  @Expose()
  name: string;
  @Expose()
  description: string;
}
