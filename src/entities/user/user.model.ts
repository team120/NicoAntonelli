import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { University } from "../university/university.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  mail: string;
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

  @ManyToOne((type) => University, (university) => university.users, {
    nullable: false,
    cascade: ["insert", "update"],
    onUpdate: "CASCADE",
  })
  university: University;
}
