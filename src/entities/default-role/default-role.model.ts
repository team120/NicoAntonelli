import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Grant } from "../grant/grant.model";

@Entity()
export class DefaultRole {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  inResearchPack: boolean;
  @ManyToMany(type => Grant, grant => grant.defaultRoles)
  @JoinTable()
  grants: Grant[];

}
