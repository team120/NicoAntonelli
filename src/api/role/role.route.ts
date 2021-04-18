import { Router } from "express";
import * as rolesActions from "./role.controller";

const roleRouter = Router();

roleRouter.get("/:projectId", rolesActions.getRolesByProjectId);

export default roleRouter;
