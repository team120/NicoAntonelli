import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { errorHandlingMiddleware } from "./middlewares/error.middleware";
import { logger } from "./logger";
import routes from "./api/index";
import { initilizePassport } from "./config/passport";

const app = express();

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.use(errorHandlingMiddleware(logger));

initilizePassport();

export default app;
