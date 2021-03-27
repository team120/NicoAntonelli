import {
  Exclude,
  Expose,
  plainToClass,
  Transform,
  Type,
} from "class-transformer";
import { DepartmentShowDto } from "../../../entities/department/output/department.show.dto";
import { UserShowDto } from "../../../entities/user/output/user.show.dto";
import { ProjectType } from "../project.model";

@Exclude()
export class ProjectShowDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  type: ProjectType;
  @Expose()
  isDown: boolean;
  @Expose()
  @Type(() => Date)
  creationDate: Date;
  @Expose()
  @Type(() => DepartmentShowDto)
  department: DepartmentShowDto;
  @Expose({ name: "userToProjects" })
  @Transform(({ value }) =>
    value.map((e: any) => plainToClass(UserShowDto, e.user)),
  )
  users: UserShowDto[];
}
