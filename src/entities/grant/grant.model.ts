import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    OneToMany,
  } from "typeorm";
import { GrantsToDefaultRoles } from "../grants_default-roles/grants-default-roles.model";
  
  @Entity()
  export class Grant {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @OneToMany((type) => GrantsToDefaultRoles, (grantToDefaultRole) => grantToDefaultRole.grant)
    grantsToDefaultRoles: GrantsToDefaultRoles[];
  }
  