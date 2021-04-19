import { Role } from "../../entities/role/role.model";
import { getRepository } from "typeorm";

export type IFindRolesByProjectId = (id: number) => Promise<Role[]>;

export const findRolesByProjectId: IFindRolesByProjectId = (
  id: number,
): Promise<Role[]> => {
  const query = getRepository(Role)
    .createQueryBuilder("role")
    .where("role.project.id = :projectId", {
      projectId: id,
    });
  return query.getMany();
};
