import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserToProjects } from "../users_projects/users-projects.model";

export enum ProjectType {
  Informal = 1,
  Formal = 2,
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ default: Date.now() })
  creationDate: Date;
  @Column()
  type: ProjectType;
  @Column({ default: false })
  isDown: boolean;
  @OneToMany((type) => UserToProjects, (userToProject) => userToProject.project)
  userToProjects: UserToProjects[];
}
