import api from "../../src/server";
import request from "supertest";
import { setupCreateAndTeardownTestDb } from "../common/setup.util";
import { RegisterInputDto } from "../../src/entities/auth/input/register.input.dto";
import { getRepository } from "typeorm";
import { User } from "../../src/entities/user/user.model";

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
      await request(api)
        .post("/auth/register")
        .send(registerInput)
        .then(async (res) => {
          expect(res.status).toBe(201);
          expect(res.body).toEqual({
            name: "newone",
            mail: "newone@example.com",
          });
          expect(
            await getRepository(User).findOne({ mail: "newone@example.com" }),
          ).toBeDefined();
        });
    });

    it(
      "should return bad request and avoid saving it when email is not valid" +
        " or the password doesn't meet the specifications" +
        " or some field is not provided",
      async () => {
        const registerInvalidInput: RegisterInputDto = {
          name: "",
          mail: "newone@example",
          password: "owe",
          university: {
            id: 1,
          },
        };
        await request(api)
          .post("/auth/register")
          .send(registerInvalidInput)
          .then(async (res) => {
            expect(res.status).toBe(400);
            expect(res.body.error.original).toEqual({
              name: "",
              mail: "newone@example",
              password: "owe",
              university: {
                id: 1,
              },
            });
            expect(res.body.error.details).toHaveLength(3);
            expect(
              await getRepository(User).findOne({ mail: "newone@example.com" }),
            ).not.toBeDefined();
          });
      },
    );

    it("should return a bad request when email is already taken and avoid creating any duplicates", async () => {
      const registerInput: RegisterInputDto = {
        name: "newone",
        mail: "user1@example.com",
        password: "onevalidpass",
        university: {
          id: 1,
        },
      };
      await request(api)
        .post("/auth/register")
        .send(registerInput)
        .then(async (res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual({
            message:
              "user1@example.com is already taken. Please use another one",
          });
          expect(
            await getRepository(User).find({ mail: "user1@example.com" }),
          ).toHaveLength(1);
        });
    });
  });
});
