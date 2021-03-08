import { ProjectFindDto } from "../../entities/project/input/project.find.dto";
import { Project } from "../../entities/project/project.model";
import { getRepository, ILike, WhereExpression } from "typeorm";
import projectRouter from "src/api/project/project.route";

export type IFindProjects = (
  relationsToInclude: string[],
  whereValues: ProjectFindDto,
) => Promise<Project[]>;

const getWhereOptions = (whereValues: ProjectFindDto): any => {
  const whereOptions: any = {
    name: whereValues.name ? ILike(`%${whereValues.name}%`) : undefined,
    userToProjects: {
      user: {
        name: whereValues.user ? ILike(`%${whereValues.user}%`) : undefined,
      },
    },
  };
  Object.keys(whereOptions).forEach(
    (key) => whereOptions[key] === undefined && delete whereOptions["name"],
  );
  return whereOptions;
};

export const findProjects: IFindProjects = (
  relationsToInclude: string[],
  whereValues: ProjectFindDto,
): Promise<Project[]> => {
  const query = getRepository(Project)
    .createQueryBuilder("project")
    .innerJoinAndSelect("project.userToProjects", "user_projects")
    .innerJoinAndSelect("user_projects.user", "user");
  if (whereValues.user !== undefined) {
    query.where("user.name = :name", { name: whereValues.user });
  }

  return query.getMany();
};
