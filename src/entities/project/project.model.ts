import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department } from "../department/department.model";
import { UserToProjects } from "../users_projects/users-projects.model";

export enum ProjectType {
  Informal = "Informal",
  Formal = "Formal",
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
  @ManyToOne(() => Department, (department) => department.projects, {
    cascade: ["insert", "update"],
    onUpdate: "CASCADE",
  })
  department: Department;
  @OneToMany(
    (type) => UserToProjects,
    (userToProject) => userToProject.project,
    { nullable: false, cascade: ["insert", "update"], onUpdate: "CASCADE" },
  )
  userToProjects: UserToProjects[];
}
