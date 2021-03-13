import { ProjectFindDto } from "../../entities/project/input/project.find.dto";
import { Project } from "../../entities/project/project.model";
import { getRepository, ILike, In, WhereExpression } from "typeorm";

export type IFindProjects = (
  relationsToInclude: string[],
  whereValues: ProjectFindDto,
) => Promise<Project[]>;

const getMatchingProjects = (
  whereValues: ProjectFindDto,
): Promise<Project[]> => {
  const query = getRepository(Project)
    .createQueryBuilder("project")
    .innerJoinAndSelect("project.userToProjects", "user_projects")
    .innerJoinAndSelect("user_projects.user", "user")
    .leftJoinAndSelect("project.department", "department")
    .leftJoinAndSelect("user.university", "university");

  if (whereValues.name !== undefined) {
    query.andWhere("project.name like :name", {
      name: `%${whereValues.name}%`,
    });
  }
  if (whereValues.type !== undefined) {
    query.andWhere("project.type like :type", {
      name: `%${whereValues.type}%`,
    });
  }
  if (whereValues.isDown !== undefined) {
    query.andWhere("project.isDown = :idDown", { isDown: whereValues.isDown });
  }
  if (whereValues.user !== undefined) {
    query.andWhere("user.name like :username", {
      username: `%${whereValues.user}%`,
    });
  }

  return query.select("project.id").getMany();
};

export const findProjects: IFindProjects = (
  relationsToInclude: string[],
  whereValues: ProjectFindDto,
): Promise<Project[]> =>
  getMatchingProjects(whereValues).then((selectedProjects) => {
    const projectsMappedString = selectedProjects
      .map((project) => project.id)
      .join(", ");

    return getRepository(Project)
      .createQueryBuilder("project")
      .innerJoinAndSelect("project.userToProjects", "user_projects")
      .innerJoinAndSelect("user_projects.user", "user")
      .leftJoinAndSelect("project.department", "department")
      .leftJoinAndSelect("user.university", "university")
      .where(`project.id IN (${projectsMappedString})`)
      .getMany();
  });
