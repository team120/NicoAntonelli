import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    OneToMany,
    ManyToMany,
  } from "typeorm";
import { DefaultRole } from "../default-role/default-role.model";
  
  @Entity()
  export class Grant {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @ManyToMany(type => DefaultRole, defaultRole => defaultRole.grants)
    defaultRoles: DefaultRole[]
  }
  