import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { University } from "../../../src/entities/university/university.model";
import { User } from "../../../src/entities/user/user.model";

export class SeedInMemoryTestDb1584749320190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const usersRepo = getRepository(User);
    const universityRepo = getRepository(University);

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

  public async down(queryRunner: QueryRunner): Promise<any> {
    const usersRepo = getRepository(User);
    const universityRepo = getRepository(University);

    const usersToRemove = await usersRepo.find({
      where: [{ name: "Pedro" }, { name: "Yael" }, { name: "Agustin" }],
    });

    usersRepo.remove(usersToRemove);

    const universitiesToRemove = await universityRepo.find({
      where: [{ name: "UTN" }, { name: "UNR" }],
    });

    universityRepo.remove(universitiesToRemove);
  }
}
