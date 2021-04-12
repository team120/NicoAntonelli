import {
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Entity,
    OneToMany,
  } from "typeorm";
import { Grant } from "../grant/grant.model";
  
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
    @OneToMany((type) => Grant, (grant) => grant.defaultRole)
    grants: Grant[]

  }
  