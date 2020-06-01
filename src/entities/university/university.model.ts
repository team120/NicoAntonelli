import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { User } from "../user/user.model";

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(type => User, user => user.university, {nullable: true})
  users: User[];
}
