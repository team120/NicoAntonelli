import { Project, ProjectType } from "../entities/project/project.model";
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { University } from "../entities/university/university.model";
import { User } from "../entities/user/user.model";
import { hashPassword } from "../utils/auth/auth.utils";
import { UserToProjects } from "../entities/users_projects/users-projects.model";
import { Department } from "../entities/department/department.model";

export class SeedDb1590967789743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const usersRepo = getRepository(User);
    const universityRepo = getRepository(University);
    const projectRepo = getRepository(Project);
    const userToProjectsRepo = getRepository(UserToProjects);
    const departmentRepo = getRepository(Department);

    const universities: University[] = [
      universityRepo.create({ name: "UTN" }),
      universityRepo.create({ name: "UNR" }),
    ];

    await universityRepo.save(universities);

    const departments: Department[] = [
      departmentRepo.create({
        name: "Ingenieria en Sistemas",
        university: universities[0],
      }),
      departmentRepo.create({
        name: "Ingenieria Civil",
        university: universities[1],
      }),
    ];

    await departmentRepo.save(departments);

    const projects: Project[] = [
      projectRepo.create({
        name:
          "Desarrollo de un sistema para identificar geoposicionamiento en entorno de Internet de la Cosas (IoT)",
        type: ProjectType.Formal,
        department: departments[0],
      }),
      projectRepo.create({
        name: "University Project Manager",
        type: ProjectType.Informal,
      }),
    ];

    await projectRepo.save(projects);

    const users: User[] = [
      usersRepo.create({
        mail: "user1@example.com",
        isMailVerified: true,
        password: await hashPassword("password1"),
        name: "user1",
        university: universities[0],
        professorId: 11444,
      }),
      usersRepo.create({
        mail: "user2@example.com",
        isMailVerified: true,
        password: await hashPassword("password2"),
        name: "user2",
        university: universities[0],
      }),
      usersRepo.create({
        mail: "user3@example.com",
        isMailVerified: true,
        password: await hashPassword("password3"),
        name: "user3",
        university: universities[0],
        requestPosition: true,
      }),
    ];

    await usersRepo.save(users);

    const usersToProjects: UserToProjects[] = [
      userToProjectsRepo.create({
        user: users[0],
        project: projects[0],
      }),
      userToProjectsRepo.create({
        user: users[1],
        project: projects[0],
      }),
      userToProjectsRepo.create({
        user: users[1],
        project: projects[1],
      }),
      userToProjectsRepo.create({
        user: users[2],
        project: projects[1],
      }),
    ];

    await userToProjectsRepo.save(usersToProjects);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const usersRepo = getRepository(User);
    const universityRepo = getRepository(University);
    const projectRepo = getRepository(Project);

    const usersToRemove = await usersRepo.find({
      where: [
        { mail: "user1@example.com" },
        { mail: "user2@example.com" },
        { mail: "user3@example.com" },
      ],
    });

    await usersRepo.remove(usersToRemove);

    const universitiesToRemove = await universityRepo.find({
      where: [{ name: "UTN" }, { name: "UNR" }],
    });

    await universityRepo.remove(universitiesToRemove);

    const projectsToRemove = await projectRepo.find({
      where: [
        {
          name:
            "Desarrollo de un sistema para identificar geoposicionamiento en entorno de Internet de la Cosas (IoT)",
        },
        { name: "University Project Manager" },
      ],
    });

    await projectRepo.remove(projectsToRemove);
  }
}
