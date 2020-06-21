import app from "./server";
import { createConnection, getConnectionOptions } from "typeorm";
import { env } from "./config";

const port = env.port;

getConnectionOptions("development").then((connOptions) =>
  createConnection({ ...connOptions, name: "default" })
    .then(async () => {
      app.listen(port, () => {
        console.info("server is listening");
      });
    })
    .catch((error) => console.error(error)),
);
