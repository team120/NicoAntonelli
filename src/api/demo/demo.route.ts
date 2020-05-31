import { Router } from "express";
import * as demoActions from "./demo.controller";

const demoRouter = Router();

demoRouter.get("/", demoActions.demo);

export default demoRouter;
