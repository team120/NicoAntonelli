import { createConnection, getConnectionOptions, getConnection } from "typeorm";

export const setupCreateAndTeardownTestDb = (): void => {
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
};
