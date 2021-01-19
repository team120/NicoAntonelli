import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { errorHandlingMiddleware } from "./middlewares/error.middleware";
import { logger } from "./logger";
import routes from "./api/index";
import { initializePassport } from "./config/passport";
import passport from "passport";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initializePassport();
app.use(passport.initialize());

app.use(routes);

app.use(errorHandlingMiddleware(logger));

export default app;
