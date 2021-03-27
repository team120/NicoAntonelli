import { ProjectFindDto } from "../../entities/project/input/project.find.dto";
import { Project } from "../../entities/project/project.model";
import { Brackets, getRepository, ILike, In, WhereExpression } from "typeorm";

export type IFindProjects = (whereValues: ProjectFindDto) => Promise<Project[]>;

const getMatchingProjects = (
  whereValues: ProjectFindDto,
): Promise<Project[]> => {
  const query = getRepository(Project)
    .createQueryBuilder("project")
    .innerJoinAndSelect("project.userToProjects", "user_projects")
    .innerJoinAndSelect("user_projects.user", "user")
    .leftJoinAndSelect("user.university", "userUniversity")
    .leftJoinAndSelect("project.department", "department")
    .leftJoinAndSelect("department.university", "departmentUniversity");

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
    query.andWhere(`userUniversity.id = :userUniversityId`, {
      userUniversityId: whereValues.universityId,
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
    query.andWhere("project.creationDate >= :dateFrom", {
      dateFrom: whereValues.dateFrom.toISOString().split("T")[0],
    });
  }

  return query.select("project.id").getMany();
};

const sortBy = new Map([
  ["name", "project.name"],
  ["department", "department.name"],
  ["university", "departmentUniversity.name"],
  ["creationDate", "project.creationDate"],
  ["type", "project.type"],
]);

export const findProjects: IFindProjects = (
  whereValues: ProjectFindDto,
): Promise<Project[]> =>
  getMatchingProjects(whereValues).then((selectedProjects) => {
    const projectsMappedString = selectedProjects
      .map((project) => project.id)
      .join(", ");

    const query = getRepository(Project)
      .createQueryBuilder("project")
      .innerJoinAndSelect("project.userToProjects", "user_projects")
      .innerJoinAndSelect("user_projects.user", "user")
      .leftJoinAndSelect("user.university", "university")
      .leftJoinAndSelect("project.department", "department")
      .leftJoinAndSelect("department.university", "departmentUniversity")
      .where(`project.id IN (${projectsMappedString})`);

    if (whereValues.sortBy !== undefined) {
      const sortByProperty = sortBy.get(whereValues.sortBy);
      console.log(sortByProperty);
      console.log(whereValues.inAscendingOrder);
      if (sortByProperty !== undefined) {
        query.orderBy(
          sortByProperty,
          whereValues.inAscendingOrder === true ? "ASC" : "DESC",
        );
      }
    }

    console.log(query.getSql());

    return query.getMany();
  });
