import { PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "../user/user.model";

export class University {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.university)
  users: User[];
}
