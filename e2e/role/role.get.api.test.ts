import api from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";

setupCreateAndTeardownTestDb();

describe("Roles actions", () => {
  describe("get roles from specified Project", () => {
    it("should return ALL roles defined in that Project with that ID", async () => {
        const projectId = 1;
      await request(api)
        .get(`/roles/${projectId}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeGreaterThan(0);
          expect(res.body[0].name).toBe("CustomRole1");
        });
    });
  });
});
