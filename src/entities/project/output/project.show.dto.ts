import {
  Exclude,
  Expose,
  plainToClass,
  Transform,
  Type,
} from "class-transformer";
import { UserShowDto } from "../../../entities/user/output/user.show.dto";
import { ProjectType } from "../project.model";

@Exclude()
export class ProjectShowDto {
  @Expose()
  name: string;
  @Expose()
  type: ProjectType;
  @Expose()
  isDown: boolean;
  @Expose({ name: "userToProjects" })
  @Transform(({ value }) =>
    value.map((e: any) => plainToClass(UserShowDto, e.user)),
  )
  users: UserShowDto[];
}
