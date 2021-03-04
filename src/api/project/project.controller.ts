import { NextFunction, Request, Response } from "express";
import { ProjectType } from "../../entities/project/project.model";

export const getProjects = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(200).json([
    {
      name:
        "Desarrollo de un sistema para identificar geoposicionamiento en entorno de Internet de la Cosas (IoT)",
      type: ProjectType.Formal,
      users: [
        {
          mail: "user1@example.com",
          name: "user1",
          university: "UTN",
          professorId: 11444,
        },
        {
          mail: "user2@example.com",
          name: "user2",
          university: "UTN",
        },
      ],
    },
  ]);
};
