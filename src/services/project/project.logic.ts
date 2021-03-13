import { plainToClass } from "class-transformer";
import { Project } from "../../entities/project/project.model";
import { ProjectFindDto } from "src/entities/project/input/project.find.dto";
import { IFindProjects } from "src/utils/project/project.utils";
import { ProjectShowDto } from "../../entities/project/output/project.show.dto";
import * as queryTypes from "../../utils/common/common.query.interface";

export const getProjects = (findProjectsQuery: IFindProjects) => async (
  whereValues: ProjectFindDto,
): Promise<ProjectShowDto[]> =>
  findProjectsQuery(whereValues).then((projects) =>
    projects.map((project) => plainToClass(ProjectShowDto, project)),
  );

export const getOneProject = (
  getOneQuery: queryTypes.getOneQueryFunc,
) => (id: number): Promise<ProjectShowDto> =>
  getOneQuery(Project, id, ["department"]).then((project) =>
    plainToClass(ProjectShowDto, project),
  );
