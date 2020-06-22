import app from "./server";
import { createConnection, getConnectionOptions } from "typeorm";
import { env } from "./config";
import * as Err from "./utils/errors/error.variants";

const port = env.port;

if (!port) {
  throw Err.EnvError("Port not defined");
}

getConnectionOptions("development").then((connOptions) =>
  createConnection({ ...connOptions, name: "default" })
    .then(async () => {
      app.listen(port, () => {
        console.info("server is listening");
      });
    })
    .catch((error) => console.error(error)),
);
