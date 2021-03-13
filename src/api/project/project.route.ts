import { Router } from "express";
import * as projectActions from "./project.controller";

const projectRouter = Router();

projectRouter.get("", projectActions.getProjects);
projectRouter.get("/:id", projectActions.getOneProject);
// TO-DO:
// projectRouter.post("", projectActions.createProject);
// projectRouter.put("/:id", projectActions.updateProject);
// projectRouter.delete("/:id", projectActions.deleteProject);

export default projectRouter;
