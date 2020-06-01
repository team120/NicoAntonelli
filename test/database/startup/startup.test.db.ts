import { Connection, createConnection } from "typeorm";
import { University } from "../../../src/entities/university/university.model";
import { User } from "../../../src/entities/user/user.model";

export const createDb = (): Promise<Connection> =>
  createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [User, University],
    synchronize: true,
    logging: false,
    migrations: ["test/database/migrations/**/*.ts"],
  });
