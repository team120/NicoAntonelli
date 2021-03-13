import { plainToClass } from "class-transformer";
import { ProjectFindDto } from "src/entities/project/input/project.find.dto";
import { IFindProjects } from "src/utils/project/project.utils";
import { ProjectShowDto } from "../../entities/project/output/project.show.dto";

export const getProjects = (findProjectsQuery: IFindProjects) => async (
  whereValues: ProjectFindDto,
): Promise<ProjectShowDto[]> => {
  console.log(whereValues);
  return findProjectsQuery(
    [
      "department",
      "userToProjects",
      "userToProjects.user",
      "userToProjects.user.university",
    ],
    whereValues,
  ).then((projects) =>
    projects.map((project) => plainToClass(ProjectShowDto, project)),
  );
};
