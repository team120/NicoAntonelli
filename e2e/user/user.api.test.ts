import api from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";

setupCreateAndTeardownTestDb();

describe("User actions", () => {
  describe("get users", () => {
    it("should return all users", async () => {
      await request(api)
        .get("/users")
        .then((res) => {
          expect(res.status).toBe(401);
          /*expect(res.body).toHaveLength(3);
          expect(res.body[0]).not.toHaveProperty("password");*/
        });
    });
  });

  describe("get one user", () => {
    it("should return the user with the specified id", async () => {
      const id = 2;
      await request(api)
        .get(`/users/${id}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe("Afak");
          expect(res.body).not.toHaveProperty("password");
        });
    });
    it("should return ID not found if it does not match any id on DB", async () => {
      const id = 100;
      await request(api)
        .get(`/users/${id}`)
        .then((res) => {
          expect(res.body.message).toBe(`Item ${id} not found`);
          expect(res.status).toBe(404);
        });
    });
  });
});
