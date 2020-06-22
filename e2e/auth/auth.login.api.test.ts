import app from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";

setupCreateAndTeardownTestDb();

describe("Auth actions", () => {
  describe("Login", () => {
    it("should login user when valid credential are provided", async () => {
      await request(app)
        .post("/auth/login")
        .send({ mail: "user1@example.com", password: "password1" })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({
            mail: "user1@example.com",
            name: "uier1",
          });
        });
    });
  });
});
