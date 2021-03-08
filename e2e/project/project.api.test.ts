import { setupCreateAndTeardownTestDb } from "../common/setup.util";
import request from "supertest";
import api from "../../src/server";

setupCreateAndTeardownTestDb();

describe("Project actions", () => {
  describe("get projects", () => {
    it("should get all projects and their associated users", async () => {
      await request(api)
        .get("/projects")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toContainEqual({
            name:
              "Desarrollo de un sistema para identificar geoposicionamiento en entorno de Internet de la Cosas (IoT)",
            type: "Formal",
            isDown: false,
            department: {
              name: "Ingenieria en Sistemas",
            },
            users: [
              {
                mail: "user1@example.com",
                lastName: null,
                name: "user1",
                university: {
                  name: "UTN",
                },
              },
              {
                mail: "user2@example.com",
                name: "user2",
                lastName: null,
                university: {
                  name: "UTN",
                },
              },
            ],
          });
          expect(res.body[0].users[0].password).not.toBeDefined();
          expect(res.body).toHaveLength(2);
        });
    });
  });

  describe("search projects", () => {
    it("should get all projects that partially match their name", async () => {
      const name = "Manager";
      await request(api)
        .get(`/projects?name=${name}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body[0]).toEqual({
            name: "University Project Manager",
            type: "Informal",
            isDown: false,
            department: {
              name: "Ingenieria en Sistemas",
            },
            users: [
              {
                mail: "user3@example.com",
                lastName: null,
                name: "user3",
                university: {
                  name: "UTN",
                },
              },
              {
                mail: "user2@example.com",
                name: "user2",
                lastName: null,
                university: {
                  name: "UTN",
                },
              },
            ],
          });
          expect(res.body).toHaveLength(1);
        });
    });
    it("should get all projects that partially match some of their users", async () => {
      const fullNamePartial = "User3";
      await request(api)
        .get(`/projects?user=${fullNamePartial}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body[0]).toEqual({
            name: "University Project Manager",
            type: "Informal",
            isDown: false,
            department: {
              name: "Ingenieria en Sistemas",
            },
            users: [
              {
                mail: "user3@example.com",
                lastName: null,
                name: "user3",
                university: {
                  name: "UTN",
                },
              },
              {
                mail: "user2@example.com",
                name: "user2",
                lastName: null,
                university: {
                  name: "UTN",
                },
              },
            ],
          });
          expect(res.body).toHaveLength(1);
        });
    });
    it("should get all projects that partially match their name and one of their users", async () => {
      const name = "Manager";
      const partialFullName = "User2";
      await request(api)
        .get(`/projects?name=${name}&user=${partialFullName}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body[0]).toEqual({
            name:
              "Desarrollo de un sistema para identificar geoposicionamiento en entorno de Internet de la Cosas (IoT)",
            type: "Formal",
            isDown: false,
            department: {
              name: "Ingenieria en Sistemas",
            },
            users: [
              {
                mail: "user1@example.com",
                lastName: null,
                name: "user1",
                university: {
                  name: "UTN",
                },
              },
              {
                mail: "user2@example.com",
                name: "user2",
                lastName: null,
                university: {
                  name: "UTN",
                },
              },
            ],
          });
          expect(res.body).toHaveLength(1);
        });
    });
  });
});
