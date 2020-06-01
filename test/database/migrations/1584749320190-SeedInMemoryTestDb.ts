import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { University } from "../../../src/entities/university/university.model";
import { User } from "../../../src/entities/user/user.model";

export class SeedDb1590967789743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const usersRepo = getRepository(User);
    const universityRepo = getRepository(University);

    const universities: University[] = [
      universityRepo.create({ name: "UTN" }),
      universityRepo.create({ name: "UNR" }),
    ];

    universityRepo.save(universities);

    const users: User[] = [
      usersRepo.create({
        mail: "user1@example",
        password: "password1",
        name: "user1",
        university: universities[0],
      }),
      usersRepo.create({
        mail: "user2@example",
        password: "password2",
        name: "user2",
        university: universities[0],
      }),
      usersRepo.create({
        mail: "user2@example",
        password: "password2",
        name: "user2",
        university: universities[0],
      }),
    ];

    usersRepo.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const usersRepo = getRepository(User);
    const universityRepo = getRepository(University);

    const usersToRemove = await usersRepo.find({
      where: [
        { mail: "user1@example" },
        { mail: "user2@example" },
        { mail: "user3@example" },
      ],
    });

    usersRepo.remove(usersToRemove);

    const universitiesToRemove = await universityRepo.find({
      where: [{ name: "UTN" }, { name: "UNR" }],
    });

    universityRepo.remove(universitiesToRemove);
  }
}
