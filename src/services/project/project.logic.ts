import { plainToClass } from "class-transformer";
import { ProjectShowDto } from "../../entities/project/output/project.show.dto";
import { Project } from "../../entities/project/project.model";
import * as queryTypes from "../../utils/common/common.query.interface";

export const getProjects = (getQuery: queryTypes.getQueryFunc) => (): Promise<
  ProjectShowDto[]
> =>
  getQuery(Project, [
    "userToProjects",
    "userToProjects.user",
    "userToProjects.user.university",
  ]).then((projects) =>
    projects.map((project) => plainToClass(ProjectShowDto, project)),
  );
