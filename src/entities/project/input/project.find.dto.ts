import { Exclude, Expose, Transform, Type } from "class-transformer";
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
  @Type(() => Date)
  dateFrom: Date;
  @Expose()
  sortBy: string;
  @Expose({ name: "order" })
  @Transform(({ value }) => value === "descending")
  descending: boolean;
}
