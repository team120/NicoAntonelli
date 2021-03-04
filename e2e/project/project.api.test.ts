import { setupCreateAndTeardownTestDb } from "../common/setup.util";
import request from "supertest";
import api from "../../src/server";
import { ProjectType } from "../../src/entities/project/project.model";

setupCreateAndTeardownTestDb();

describe("Project actions", () => {
  describe("get projects", () => {
    it("should get all projects and their associated users", async () => {
      await request(api)
        .get("/projects")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body[0]).toEqual({
            name:
              "Desarrollo de un sistema para identificar geoposicionamiento en entorno de Internet de la Cosas (IoT)",
            type: 2,
            users: [
              {
                mail: "user1@example.com",
                name: "user1",
                professorId: 11444,
                university: "UTN",
              },
              { mail: "user2@example.com", name: "user2", university: "UTN" },
            ],
          });
          expect(res.body[0].users[0].password).not.toBeDefined();
        });
    });
  });
});
