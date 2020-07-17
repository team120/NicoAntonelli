import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { University } from "../university/university.model";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToOne((type) => University, (university) => university.departments, {
    nullable: false,
    cascade: ["insert", "update"],
    onUpdate: "CASCADE",
  })
  university: University;
}
