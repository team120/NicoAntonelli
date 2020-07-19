import app from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";

setupCreateAndTeardownTestDb();

describe("University actions", () => {
  describe("get universities", () => {
    it("should return all universities", async () => {
      await request(app)
        .get("/universities")
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveLength(2);
          expect(res.body[0]).not.toHaveProperty("id");
        });
    });
  });

  describe("get one university", () => {
    it("should return the university with the specified id", async () => {
      const id = 2;
      await request(app)
        .get(`/universities/${id}`)
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual("UNR");
          expect(res.body).not.toHaveProperty("id");
        });
    });
    it("should return ID not found if it does not match any id on DB", async () => {
      const id = 100;
      await request(app)
        .get(`/universities/${id}`)
        .then((res) => {
          expect(res.body.message).toEqual(`Item ${id} not found`);
          expect(res.status).toEqual(404);
        });
    });
  });
});
