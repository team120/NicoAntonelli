import { getConnection, createConnection, getConnectionOptions } from "typeorm";
import app from "../../src/server";
import request from "supertest";

beforeEach(async () => {
  const connectionOptions = await getConnectionOptions("test");
  const connection = await createConnection({
    ...connectionOptions,
    name: "default",
  });
  await connection.runMigrations();
});

afterEach(() => {
  return getConnection().close();
});

describe("get users", () => {
  it("should return all users", async () => {
    await request(app)
      .get("/users")
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toHaveLength(3);
        expect(res.body[0]).not.toHaveProperty("password");
      });
  });
});

describe("get one user", () => {
  it("should return the user with the specified id", async () => {
    const id = 2;
    await request(app)
      .get(`/users/${id}`)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual("user2");
        expect(res.body).not.toHaveProperty("password");
      });
  });
  it("should return ID not found if it does not match any id on DB", async () => {
    const id = 100;
    await request(app)
      .get(`/users/${id}`)
      .then((res) => {
        expect(res.body.message).toEqual(`Item ${id} not found`);
        expect(res.status).toEqual(404);
      });
  });
});
