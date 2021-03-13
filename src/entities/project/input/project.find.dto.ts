import { Exclude, Expose } from "class-transformer";
import { ProjectType } from "../project.model";

@Exclude()
export class ProjectFindDto {
  @Expose()
  name: string;
  @Expose()
  type: ProjectType;
  @Expose()
  isDown: boolean;
  @Expose()
  department: string;
  @Expose()
  user: string;
}
