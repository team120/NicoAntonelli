import app from "./server";
import { createConnection } from "typeorm";
import { env } from "./config";

const port = env.port;

createConnection()
  .then(async () => {
    app.listen(port, () => {
      console.info("server is listening");
    });
  })
  .catch((error) => console.error(error));
