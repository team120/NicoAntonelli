import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
  } from "typeorm";

  
  @Entity()
  export class Grant {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
  }
  