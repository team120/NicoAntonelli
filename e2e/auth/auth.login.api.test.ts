import api from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";

setupCreateAndTeardownTestDb();

describe("Auth actions", () => {
  describe("Login", () => {
    it("should login user when valid credentials are provided", async () => {
      await request(api)
        .post("/auth/login")
        .send({ mail: "user1@example.com", password: "password1" })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.mail).toBe("user1@example.com");
          expect(res.body.name).toBe("John");
          expect(res.body.password).not.toBeDefined();
          expect(res.body.accessToken).toBeDefined();
        });
    });

    it("should return bad request with a generic message when user doesn't exists", async () => {
      await request(api)
        .post("/auth/login")
        .send({ mail: "none@example.com", password: "password1" })
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body.message).toBe("Invalid credentials");
          expect(res.body.token).not.toBeDefined();
        });
    });

    it("should return bad request with a generic message when password doesn't match", async () => {
      await request(api)
        .post("/auth/login")
        .send({ mail: "user1@example.com", password: "not_the_password" })
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body.message).toBe("Invalid credentials");
          expect(res.body.token).not.toBeDefined();
        });
    });
  });
});
