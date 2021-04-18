import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
  } from "typeorm";
  
  @Entity()
  export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    projectId: number;
  }
  