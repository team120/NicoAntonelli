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
                lastName: "Doe",
                name: "John",
                university: {
                  name: "UTN",
                },
              },
              {
                mail: "user2@example.com",
                name: "Afak",
                lastName: "Ename",
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
            department: null,
            users: [
              {
                mail: "user2@example.com",
                name: "Afak",
                lastName: "Ename",
                university: {
                  name: "UTN",
                },
              },
              {
                mail: "user3@example.com",
                lastName: "Eaning",
                name: "Nom",
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
      const fullNamePartial = "Nom";
      await request(api)
        .get(`/projects?user=${fullNamePartial}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body[0]).toEqual({
            name: "University Project Manager",
            department: null,
            type: "Informal",
            isDown: false,
            users: [
              {
                mail: "user2@example.com",
                name: "Afak",
                lastName: "Ename",
                university: {
                  name: "UTN",
                },
              },
              {
                mail: "user3@example.com",
                lastName: "Eaning",
                name: "Nom",
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
      const name = "VERS";
      const partialFullName = "FAk";
      await request(api)
        .get(`/projects?name=${name}&user=${partialFullName}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body[0]).toEqual({
            name: "University Project Manager",
            department: null,
            type: "Informal",
            isDown: false,
            users: [
              {
                mail: "user2@example.com",
                name: "Afak",
                lastName: "Ename",
                university: {
                  name: "UTN",
                },
              },
              {
                mail: "user3@example.com",
                lastName: "Eaning",
                name: "Nom",
                university: {
                  name: "UTN",
                },
              },
            ],
          });
          expect(res.body).toHaveLength(1);
        });
    });
    describe("when isDown parameter is provided", () => {
      describe("and set to false", () => {
        it("should get every project", async () => {
          const isDown = false;
          await request(api)
            .get(`/projects/?isDown=${isDown}`)
            .then((res) => {
              expect(res.status).toBe(200);
              expect(res.body).toHaveLength(2);
            });
        });
      });

      describe("and set to true", () => {
        it("should get no projects", async () => {
          const isDown = true;
          await request(api)
            .get(`/projects/?isDown=${isDown}`)
            .then((res) => {
              expect(res.status).toBe(200);
              expect(res.body).toHaveLength(0);
            });
        });
        it("should get no projects as well when another parameter is provided", async () => {
          const isDown = true;
          const projectName = "University";
          await request(api)
            .get(`/projects/?isDown=${isDown}&name=${projectName}`)
            .then((res) => {
              expect(res.status).toBe(200);
              expect(res.body).toHaveLength(0);
            });
        });
      });
    });
  });
});
