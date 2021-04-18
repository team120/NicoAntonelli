import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { Project } from "../project/project.model";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToOne((type) => Project, (project) => project.roles)
  project: Project;
}
