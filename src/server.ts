import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { errorHandlingMiddleware } from "./middlewares/error.middleware";
import { logger } from "./logger";
import morgan from "morgan"
import routes from "./api/index";

const app = express();

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.use(morgan("common", {
    stream: { write: (message) => logger.info(message) }
}));

app.use(errorHandlingMiddleware(logger));

export default app;
