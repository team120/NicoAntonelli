import { Exclude, Expose, Type , Transform, plainToClass} from "class-transformer";
import { GrantShowDto } from "../../grant/output/grant.show.dto";

@Exclude()
export class DefaultRoleDto {
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  @Transform(({ value }) => value === true)
  inResearchPack: boolean;
  @Expose()
  @Type(() => GrantShowDto)
  grants: GrantShowDto[];
}
