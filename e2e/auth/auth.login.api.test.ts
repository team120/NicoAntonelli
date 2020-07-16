import app from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";

setupCreateAndTeardownTestDb();

describe("Auth actions", () => {
  describe("Login", () => {
    it("should login user when valid credentials are provided", async () => {
      await request(app)
        .post("/auth/login")
        .send({ mail: "user1@example.com", password: "password1" })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body.mail).toEqual("user1@example.com");
          expect(res.body.name).toEqual("user1");
          expect(res.body.password).not.toBeDefined();
          expect(res.body.token).toBeDefined();
        });
    });

    it("should return bad request with a generic message when user doesn't exists", async () => {
      await request(app)
        .post("/auth/login")
        .send({ mail: "none@example.com", password: "password1" })
        .then((res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual("Invalid credentials");
          expect(res.body.token).not.toBeDefined();
        });
    });

    it("should return bad request with a generic message when password doesn't match", async () => {
      await request(app)
        .post("/auth/login")
        .send({ mail: "user1@example.com", password: "not_the_password" })
        .then((res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual("Invalid credentials");
          expect(res.body.token).not.toBeDefined();
        });
    });
  });
});
