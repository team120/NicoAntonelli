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

  describe("create one university", () => {
    it("should return status 200 OK and the new university", async () => {
      await request(app)
        .post("/universities")
        .send({ "name": "UNC" })
        .set("Accept", "application/json")
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({ "name": "UNC" });
          expect(res.body).not.toHaveProperty("id");
        });
    });
    it("should create the new university without the incorrect properties", async () => {
      await request(app)
        .post("/universities")
        .send({ "name": "UNC", "incorrectProperty": "incorrectValue" })
        .set("Accept", "application/json")
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({ "name": "UNC" });
          expect(res.body).not.toHaveProperty("incorrectProperty");
          expect(res.body).not.toHaveProperty("id");
        });
    });
    it("should return a list of universities with the new one included", async () => {
      await request(app)
        .post("/universities")
        .send({ "name": "UNC" })
        .set("Accept", "application/json")
      await request(app)
        .get("/universities")
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveLength(3);
          expect(res.body[2]).toEqual({ "name": "UNC" });
          expect(res.body[2]).not.toHaveProperty("id");
        });
    });
  });

  describe("update one university", () => {
    it("should return status 200 OK and the updated university", async () => {
      await request(app)
        .put("/universities/2")
        .send({ "name": "UBA" })
        .set("Accept", "application/json")
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({ "name": "UBA" });
          expect(res.body).not.toHaveProperty("id");
        });
    });
    it("should update the new university without the incorrect properties", async () => {
      await request(app)
        .post("/universities")
        .send({ "name": "UNC", "incorrectProperty": "incorrectValue" })
        .set("Accept", "application/json")
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({ "name": "UNC" });
          expect(res.body).not.toHaveProperty("incorrectProperty");
          expect(res.body).not.toHaveProperty("id");
        });
    });
    it("should return a list of universities where the updated one is correct", async () => {
      await request(app)
        .put("/universities/1")
        .send({ "name": "UBA" })
        .set("Accept", "application/json")
      await request(app)
        .get("/universities")
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveLength(2);
          expect(res.body[0]).toEqual({ "name": "UBA" });
          expect(res.body[0]).not.toHaveProperty("id");
        });
    });
  });
});
