import api from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";

setupCreateAndTeardownTestDb();

describe("Roles actions", () => {
  describe("get roles from specified Project", () => {
    it("should return ALL custom roles defined in that Project with that ID", async () => {
      const projectId = 1;
      await request(api)
        .get(`/roles/${projectId}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveLength(2);
          expect(res.body[0].name).toBe("CustomRole1 for Project 1");
        });
    });
  });
  it("should return empty array if Project ID does not match any on DB", async () => {
    const projectId = 100;
    await request(api)
      .get(`/roles/${projectId}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
      });
  });
});
