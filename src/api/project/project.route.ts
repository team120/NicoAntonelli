import { Router } from "express";
import * as projectActions from "./project.controller";

const projectRouter = Router();

projectRouter.get("", projectActions.getProjects);

export default projectRouter;
