import app from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";
import { RegisterInputDto } from "../../src/entities/auth/input/register.input.dto";

setupCreateAndTeardownTestDb();

describe("Auth actions", () => {
  describe("SignUp", () => {
    it("should create an user with the provided data", async () => {
      const registerInput: RegisterInputDto = {
        name: "newone",
        mail: "newone@example.com",
        password: "onevalidpass",
        university: {
          id: 1,
        },
      };
      await request(app)
        .post("/auth/register")
        .send(registerInput)
        .then((res) => {
          expect(res.status).toEqual(201);
          expect(res.body).toEqual({
            name: "newone",
            mail: "newone@example.com",
          });
        });
    });

    it(
      "should return bad request if email is not valid" +
        " or/and the password doesn't meet the specifications" +
        " or/and some field is not provided",
      async () => {
        const registerInvalidInput: RegisterInputDto = {
          name: "",
          mail: "newone@example",
          password: "owe",
          university: {
            id: 1,
          },
        };
        await request(app)
          .post("/auth/register")
          .send(registerInvalidInput)
          .then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.error.original).toEqual({
              name: "",
              mail: "newone@example",
              password: "owe",
              university: {
                id: 1,
              },
            });
            expect(res.body.error.details).toHaveLength(3);
          });
      },
    );

    it("should return a bad request if email is already taken", async () => {
      const registerInput: RegisterInputDto = {
        name: "newone",
        mail: "user1@example.com",
        password: "onevalidpass",
        university: {
          id: 1,
        },
      };
      await request(app)
        .post("/auth/register")
        .send(registerInput)
        .then((res) => {
          expect(res.status).toEqual(400);
          expect(res.body).toEqual({
            message:
              "user1@example.com is already taken. Please use another one",
          });
        });
    });
  });
});
