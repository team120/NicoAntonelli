import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { errorHandlingMiddleware } from "./middlewares/error.middleware";
import { logger } from "./logger";
import userRoutes from "./api/user/user.route";

const app = express();

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(userRoutes);

app.use(errorHandlingMiddleware(logger));

export default app;
