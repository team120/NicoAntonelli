import { Exclude, Expose, Transform } from "class-transformer";
import { ProjectType } from "../project.model";

@Exclude()
export class ProjectFindDto {
  @Expose()
  generalSearch: string;
  @Expose()
  type: ProjectType;
  @Expose()
  @Transform(({ value }) => (value === "true" ? true : false))
  isDown: boolean;
  @Expose()
  departmentId: number;
  @Expose()
  universityId: number;
  @Expose()
  userId: number;
  @Expose()
  dateFrom: Date;
}
