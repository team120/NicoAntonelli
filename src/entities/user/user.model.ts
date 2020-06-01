import { PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { University } from "../university/university.model";

export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  mail: string;
  @Column()
  dni: string;
  @Column()
  password: string;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  studentId: number;
  @Column()
  professorId: number;
  @Column()
  professorCategory: string;

  @ManyToOne(() => University, (university) => university.users)
  university: University;
}
