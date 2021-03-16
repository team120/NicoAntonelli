import { setupCreateAndTeardownTestDb } from "../common/setup.util";
import request from "supertest";
import api from "../../src/server";

setupCreateAndTeardownTestDb();

describe("get one project", () => {
  it("should return the project with the specified id", async () => {
    const id = 2;
    await request(api)
      .get(`/projects/${id}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toEqual("University Projects Manager");
      });
  });
  it("should return ID not found if it does not match any id on DB", async () => {
    const id = 100;
    await request(api)
      .get(`/projects/${id}`)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual(`Item ${id} not found`);
      });
  });
  it("should get the specified project with their associated users", async () => {
    const id = 1;
    await request(api)
      .get(`/projects/${id}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          name:
            "Desarrollo de un sistema para identificar geoposicionamiento en entorno de Internet de la Cosas (IoT)",
          type: "Formal",
          isDown: false,
          department: {
            id: 1,
            name: "Ingeniería en Sistemas",
            university: {
              id: 1,
              name: "UTN",
            },
          },
          users: [
            {
              mail: "user1@example.com",
              lastName: "Doe",
              name: "John",
              university: {
                id: 1,
                name: "UTN",
              },
            },
            {
              mail: "user2@example.com",
              name: "Afak",
              lastName: "Ename",
              university: {
                id: 1,
                name: "UTN",
              },
            },
          ],
        });
        expect(res.body.users[0].password).not.toBeDefined();
      });
  });
});
