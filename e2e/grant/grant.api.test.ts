import api from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";

setupCreateAndTeardownTestDb();

describe("Grant actions", () => {
  describe("get grants", () => {
    it("should return all grants", async () => {
      await request(api)
        .get("/grants")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveLength(3);
          expect(res.body[0]).not.toHaveProperty("id");
        });
    });
  });

  describe("get one grant", () => {
    it("should return the grant with the specified id", async () => {
      const id = 1;
      await request(api)
        .get(`/grants/${id}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe("grant_readonly");
          expect(res.body.description).toBeDefined();
          expect(res.body).not.toHaveProperty("id");
        });
    });
    it("should return ID not found if it does not match any id on DB", async () => {
      const id = 50;
      await request(api)
        .get(`/grants/${id}`)
        .then((res) => {
          expect(res.body.message).toBe(`Item ${id} not found`);
          expect(res.status).toBe(404);
        });
    });
  });
});