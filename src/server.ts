import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { errorHandlingMiddleware } from "./middlewares/error.middleware";
import { logger } from "./logger";
import routes from "./api/index";
import { initilizePassport as initializePassport } from "./config/passport";
import passport from "passport";

const app = express();

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initializePassport();
app.use(passport.initialize());

app.use(routes);

app.use(errorHandlingMiddleware(logger));

export default app;
