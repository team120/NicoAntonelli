import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
  } from "typeorm";
import { DefaultRole } from "../default_role/default-role.model"
  
  @Entity()
  export class Grant {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @ManyToOne((type) => DefaultRole, (defaultRole) => defaultRole.grants)
    defaultRole: DefaultRole
  }
  