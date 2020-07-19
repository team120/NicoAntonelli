import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  OneToOne,
} from "typeorm";
import { University } from "../university/university.model";
import { GoogleProfile } from "../auth/googleProfile";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  mail: string;
  @Column({ default: false })
  isMailVerified: boolean;
  @Column()
  password: string;
  @Column({ nullable: true })
  dni: string;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  lastName: string;
  @Column({ nullable: true })
  studentId: number;
  @Column({ nullable: true })
  professorId: number;
  @Column({ nullable: true })
  professorCategory: string;
  @Column({ nullable: true })
  gender: string;
  @Column({ nullable: true })
  picture: string;

  @OneToOne((type) => GoogleProfile, (profile) => profile.user, {
    nullable: true,
  })
  googleProfile: GoogleProfile;

  @ManyToOne((type) => University, (university) => university.users, {
    nullable: false,
    cascade: ["insert", "update"],
    onUpdate: "CASCADE",
  })
  university: University;
}
