import { Exclude, Expose, Transform } from "class-transformer";
import { ProjectType } from "../project.model";

@Exclude()
export class ProjectFindDto {
  @Expose()
  name: string;
  @Expose()
  type: ProjectType;
  @Expose()
  @Transform(({ value }) => (value === "true" ? true : false))
  isDown: boolean;
  @Expose()
  department: string;
  @Expose()
  user: string;
}
