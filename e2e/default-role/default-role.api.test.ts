import api from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";

setupCreateAndTeardownTestDb();

describe("Default Roles actions", () => {
  describe("get default roles", () => {
    it("should return both formal and informal default roles", async () => {
      const inResearchPack = false;
      await request(api)
        .get("/default-roles")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveLength(3);
          expect(res.body).not.toHaveProperty("id");
        });
    });
  });
  describe("get default roles with inResearchPack set to false", () => {
    it("should return only roles which are for Informal Projects", async () => {
      const type = "informal";
      await request(api)
        .get(`/default-roles?inResearchPack=${type}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveLength(2);
          expect(res.body).not.toHaveProperty("id");
          expect(res.body[0].name).toBe("Member");
        });
    });
  });
  describe("get default roles with inResearchPack set to true", () => {
    it("should return only roles which are for Formal Projects", async () => {
      const type = "formal";
      await request(api)
        .get(`/default-roles?inResearchPack=${type}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveLength(1);
          expect(res.body[0].name).toBe("Director")
        });
    });
  });
});
