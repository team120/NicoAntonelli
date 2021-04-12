import { Exclude, Expose, Type } from "class-transformer";
import { GrantShowDto } from "../../grant/output/grant.show.dto";

@Exclude()
export class DefaultRoleDto {
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  grants: GrantShowDto[]
}
