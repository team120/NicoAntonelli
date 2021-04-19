import api from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";

setupCreateAndTeardownTestDb();

describe("Default Roles actions", () => {
  describe("get default roles", () => {
    it("should return both formal and informal default roles", async () => {
      await request(api)
        .get("/default-roles")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveLength(5);
        });
    });
  });
  describe("get default roles with inResearchPack set to false", () => {
    it("should return only roles which are for Informal Projects", async () => {
      const inResearchPack = false;
      await request(api)
        .get(`/default-roles?inResearchPack=${inResearchPack}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveLength(3);
          expect(res.body[0].name).toBe("Member");
        });
    });
  });
  describe("get default roles with inResearchPack set to true", () => {
    it("should return only roles which are for Formal Projects", async () => {
      const inResearchPack = true;
      await request(api)
        .get(`/default-roles?inResearchPack=${inResearchPack}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveLength(2);
          expect(res.body[0].name).toBe("Director");
        });
    });
  });
  describe("get one default role", () => {
    it("should return default role with specified ID with asociated grants", async () => {
      const id = 1;
      await request(api)
        .get(`/default-roles/${id}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe("Member");
          expect(res.body.inResearchPack).toBe(false);
          expect(res.body.grants).toBeDefined();
          expect(res.body.grants).toHaveLength(2);
        });
    });
    it("should return appropiate message if ID is not found on DB", async () => {
      const id = 100;
      const message = `Item ${id} not found`;
      await request(api)
        .get(`/default-roles/${id}`)
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body.message).toBe(message);
          expect(res.body.name).not.toBeDefined();
          expect(res.body.description).not.toBeDefined();
          expect(res.body.grants).not.toBeDefined();
        });
    });
  });
});
