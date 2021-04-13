import { Exclude, Expose, Type , Transform, plainToClass} from "class-transformer";
import { GrantShowDto } from "../../grant/output/grant.show.dto";

@Exclude()
export class DefaultRoleDto {
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  @Transform(({ value }) => value === "true")
  inResearchPack: boolean;
  @Expose()
  @Transform(({ value }) =>
    value.map((e: any) => plainToClass(GrantShowDto, e.grant)),
  )
  grants: GrantShowDto[];
}
