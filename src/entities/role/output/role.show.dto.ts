import { Exclude, Expose } from "class-transformer";

@Exclude()
export class RoleShowDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  description: string;
}
