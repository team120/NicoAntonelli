import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Department } from "../../../src/entities/department/department.model";
import {
  Project,
  ProjectType,
} from "../../../src/entities/project/project.model";
import { University } from "../../../src/entities/university/university.model";
import { User } from "../../../src/entities/user/user.model";
import { UserToProjects } from "../../../src/entities/users_projects/users-projects.model";
import { hashPassword } from "../../../src/utils/auth/auth.utils";
import { Grant } from "../../../src/entities/grant/grant.model"
import { DefaultRole } from "../../../src/entities/default_role/default-role.model";

export class SeedDb1590967789743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const usersRepo = getRepository(User);
    const universityRepo = getRepository(University);
    const projectRepo = getRepository(Project);
    const userToProjectsRepo = getRepository(UserToProjects);
    const departmentRepo = getRepository(Department);
    const grantRepo = getRepository(Grant);
    const defaultRoleRepo = getRepository(DefaultRole);

    const universities: University[] = [
      universityRepo.create({ name: "UTN" }),
      universityRepo.create({ name: "UNR" }),
    ];

    await universityRepo.save(universities);

    const departments: Department[] = [
      departmentRepo.create({
        name: "Ingeniería en Sistemas",
        university: universities[0],
      }),
      departmentRepo.create({
        name: "Ingeniería Civil",
        university: universities[0],
      }),
      departmentRepo.create({
        name: "Ingeniería Química",
        university: universities[0],
      }),
      departmentRepo.create({
        name: "Ciencias Básicas",
        university: universities[1],
      }),
      departmentRepo.create({
        name: "Ingeniería Electrónica",
        university: universities[1],
      }),
    ];

    await departmentRepo.save(departments);

    const grantList: Grant[] = [
      grantRepo.create({
        name: "grant_member_add",
        description: "Add members to the project",
      }),
      grantRepo.create({
        name: "grant_member_delete",
        description: "Remove members from the project",
      }),
      grantRepo.create({
        name: "grant_member_editRole",
        description: "Edit roles from users",
      }),
      grantRepo.create({
        name: "grant_customRole_add",
        description: "Add a custom role to the project",
      }),
      grantRepo.create({
        name: "grant_customRole_edit",
        description: "Edit a custom role from the project",
      }),
      grantRepo.create({
        name: "grant_customRole_delete",
        description: "Remove a custom role from the project",
      }),
      grantRepo.create({
        name: "grant_publication_readonly",
        description: "Readonly access to publications",
      }),
      grantRepo.create({
        name: "grant_publication_readwrite",
        description: "Read, add and edit publications",
      }), 
      grantRepo.create({
        name: "grant_publication_delete",
        description: "Remove publications from project",
      }),
    ];

    await grantRepo.save(grantList);

    const grantsForMember: Grant[] = await grantRepo.find({
      where: [
        { name: "grant_member_add" },
        { name: "grant_publication_readonly" },
      ],
    });

    const grantsForAdmin: Grant[] = grantList;

    const defaultRoles: DefaultRole[] = [
      defaultRoleRepo.create({
        name: "Member",
        description: "Simple member",
        inResearchPack: false,
        grants: [grantList[0], grantList[1], grantList[6]],
      }),
      defaultRoleRepo.create({
        name: "Admin",
        description: "Group Administrator",
        inResearchPack: false,
        grants: grantsForAdmin,
      })
    ];

    await defaultRoleRepo.save(defaultRoles);

    const projects: Project[] = [
      projectRepo.create({
        name:
          "Desarrollo de un sistema para identificar geoposicionamiento en entorno de Internet de la Cosas (IoT)",
        type: ProjectType.Formal,
        department: departments[0],
        creationDate: "2020-03-16 14:13:02",
      }),
      projectRepo.create({
        name: "University Projects Manager",
        type: ProjectType.Informal,
        creationDate: "2021-03-16 14:13:02",
      }),
    ];

    await projectRepo.save(projects);

    const users: User[] = [
      usersRepo.create({
        mail: "user1@example.com",
        isMailVerified: true,
        password: await hashPassword("password1"),
        name: "John",
        lastName: "Doe",
        university: universities[0],
        professorId: 11444,
      }),
      usersRepo.create({
        mail: "user2@example.com",
        isMailVerified: true,
        password: await hashPassword("password2"),
        name: "Afak",
        lastName: "Ename",
        university: universities[0],
      }),
      usersRepo.create({
        mail: "user3@example.com",
        isMailVerified: true,
        password: await hashPassword("password3"),
        name: "Nom",
        lastName: "Eaning",
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
    const userToProjectsRepo = getRepository(UserToProjects);
    const departmentRepo = getRepository(Department);
    const grantsRepo = getRepository(Grant);
    const defaultRoleRepo = getRepository(DefaultRole);

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

    const departmentsToRemove = await departmentRepo.find({
      where: [
        { university: universitiesToRemove[0] },
        { university: universitiesToRemove[1] },
      ],
    });

    await departmentRepo.remove(departmentsToRemove);

    const defaultRolesToRemove = await defaultRoleRepo.find({
      where: [
        {name: "Member"},
        {name: "Admin"},
      ]
    });
    await defaultRoleRepo.remove(defaultRolesToRemove);

    const grantsToRemove = await grantsRepo.find({
      where: [
        { name: "grant_" },
      ],
    });
    
    await grantsRepo.remove(grantsToRemove);
  }
}
