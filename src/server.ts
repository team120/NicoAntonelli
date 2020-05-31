import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { errorHandlingMiddleware } from "./middlewares/error.middleware";
import { logger } from "./logger";

const app = express();

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("ok");
});

app.use(errorHandlingMiddleware(logger));

export default app;
