import { Exclude, Expose, Transform, Type } from "class-transformer";
import { UserShowDto } from "../../../entities/user/output/user.show.dto";
import { ProjectType } from "../project.model";

@Exclude()
class ProjectUser {
  @Expose()
  @Type(() => UserShowDto)
  user: UserShowDto;
}

@Exclude()
export class ProjectShowDto {
  @Expose()
  name: string;
  @Expose()
  type: ProjectType;
  @Expose()
  isDown: boolean;
  @Expose({ name: "userToProjects" })
  @Transform((val) => val.map((e: any) => e.user))
  users: UserShowDto[];
}
