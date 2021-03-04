import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "../project/project.model";
import { User } from "../user/user.model";

@Entity()
export class UserToProjects {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => User, (user) => user.userToProjects)
  user: User;
  @ManyToOne((type) => Project, (project) => project.userToProjects)
  project: Project;
}
