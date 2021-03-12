import { ProjectFindDto } from "../../entities/project/input/project.find.dto";
import { Project } from "../../entities/project/project.model";
import { Brackets, getRepository, ILike, In, WhereExpression } from "typeorm";

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

  if (whereValues.generalSearch !== undefined) {
    query.where(
      new Brackets((qb) => {
        qb.where("project.name like :name", {
          name: `%${whereValues.generalSearch}%`,
        }).orWhere("user.name like :username", {
          username: `%${whereValues.generalSearch}%`,
        });
      }),
    );
  }

  if (whereValues.universityId !== undefined) {
    query.andWhere("university.id = :universityId", {
      universityId: whereValues.universityId,
    });
  }
  if (whereValues.departmentId !== undefined) {
    query.andWhere("department.id = :departmentId", {
      departmentId: whereValues.departmentId,
    });
  }
  if (whereValues.type !== undefined) {
    query.andWhere("project.type = :type", { type: whereValues.type });
  }
  if (whereValues.isDown !== undefined) {
    query.andWhere("project.isDown = :isDown", { isDown: whereValues.isDown });
  }
  if (whereValues.userId !== undefined) {
    query.andWhere("user.id = :userId", { userId: whereValues.userId });
  }
  if (whereValues.dateFrom !== undefined) {
    console.log(whereValues.dateFrom);
    query.andWhere("project.creationDate >= :dateFrom", {
      dateFrom: whereValues.dateFrom,
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
