import { DefaultRoleDto } from "src/entities/default-role/output/default-role.show.dto";
import { getRepository } from "typeorm";
import { DefaultRole } from "../../entities/default-role/default-role.model";
import { DefaultRoleFindDto } from "../../entities/default-role/input/default-role.find.dto";

export type IFindDefaultRoles = (
  whereValues: DefaultRoleFindDto,
) => Promise<DefaultRole[]>;

export const findDefaultRoles: IFindDefaultRoles = (
  whereValues: DefaultRoleFindDto,
): Promise<DefaultRole[]> => {
    const query = getRepository(DefaultRole)
    .createQueryBuilder("defaultRole")
    .innerJoinAndSelect("defaultRole.grants", "grant");
    
    if(whereValues.inResearchPack !== undefined){
      console.log(whereValues);
      query.where("defaultRole.inResearchPack = :inResearchPack", {
        inResearchPack: whereValues.inResearchPack
      });
    }
  
    return query.getMany();
};
