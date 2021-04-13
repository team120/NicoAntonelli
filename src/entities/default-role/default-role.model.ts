import {
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Entity,
    OneToMany,
  } from "typeorm";
import { Grant } from "../grant/grant.model";
import { GrantsToDefaultRoles } from "../grants_default-roles/grants-default-roles.model";
  
  @Entity()
  export class DefaultRole {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    // TODO Redefine variable name
    inResearchPack: boolean;
    @OneToMany((type) => GrantsToDefaultRoles, (grantToDefaultRole) => grantToDefaultRole.defaultRole)
    grantsToDefaultRoles: GrantsToDefaultRoles[];

  }
  