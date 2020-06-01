import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { University } from "../entities/university/university.model";
import { User } from "../entities/user/user.model";

export class SeedDb1590967789743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const universityRepo = getRepository(University);
    const usersRepo = getRepository(User);

    const universities: University[] = [
      universityRepo.create({ name: "UTN" }),
      universityRepo.create({ name: "UNR" }),
    ];

    universityRepo.save(universities);

    const users: User[] = [
      usersRepo.create({ name: "Pedro", university: universities[0] }),
      usersRepo.create({ name: "Yael", university: universities[0] }),
      usersRepo.create({ name: "Agustin", university: universities[0] }),
    ];

    usersRepo.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
