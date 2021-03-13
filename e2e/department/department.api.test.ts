import app from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";
import { Department } from "../../src/entities/department/department.model";

setupCreateAndTeardownTestDb();

describe("Departments actions", () => {
  describe("Get all departments", () => {
    it("should return all departments", async () => {
      await request(app)
        .get("/departments")
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveLength(5);
        });
    });
  });

  describe("Get one department", () => {
    it("should return the department with specified id", async () => {
      const id = 3;
      await request(app)
        .get(`/departments/${id}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe("Ingeniería Química");
          expect(res.body.university).toBeDefined();
          expect(res.body.university.name).toEqual("UTN");
        });
    });

    it("should return ID not found if it does not match any id on DB", async () => {
      const id = 500;
      await request(app)
        .get(`/departments/${id}`)
        .then((res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual(`Item ${id} not found`);
        });
    });
  });
  describe("Create one department", () => {
    it("should return status 201 OK and the department created", async () => {
      const departmentInput = {
        name: "Ciencias Básicas",
        university: {
          id: 1,
        },
      };
      await request(app)
        .post("/departments")
        .send(departmentInput)
        .set("Accept", "application/json")
        .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body.name).toBe("Ciencias Básicas");
          expect(res.body.university.name).toBe("UTN");
        });
    });
  });
});
