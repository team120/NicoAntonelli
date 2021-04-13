import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DefaultRole } from "../default-role/default-role.model";
import { Grant } from "../grant/grant.model";

@Entity()
export class GrantsToDefaultRoles {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => Grant, (grant) => grant.grantsToDefaultRoles)
  grant: Grant;
  @ManyToOne((type) => DefaultRole, (defaultRole) => defaultRole.grantsToDefaultRoles)
  defaultRole: DefaultRole;
}
