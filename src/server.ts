import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { errorHandlingMiddleware } from "./middlewares/error.middleware";
import { logger } from "./logger";
import demoRoutes from "./api/demo/demo.route";

const app = express();

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(demoRoutes);

app.use(errorHandlingMiddleware(logger));

export default app;
