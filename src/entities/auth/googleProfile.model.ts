import { Entity, PrimaryColumn, Column, OneToOne } from "typeorm";
import { User } from "../user/user.model";

@Entity()
export class GoogleProfile {
  @PrimaryColumn()
  id: string;
  @Column()
  refreshToken: string;
  @OneToOne((type) => User, (user) => user.googleProfile, { nullable: true })
  user: User;
}
