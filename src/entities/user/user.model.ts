import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { University } from "../university/university.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  mail: string;
  @Column()
  dni?: string;
  @Column()
  password?: string;
  @Column()
  name?: string;
  @Column()
  lastName?: string;
  @Column()
  studentId?: number;
  @Column()
  professorId?: number;
  @Column()
  professorCategory?: string;

  @ManyToOne(type => University, university => university.users)
  university: University;
}
