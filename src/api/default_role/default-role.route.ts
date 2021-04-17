import { Router } from "express";
import * as defaultRolesActions from "./default-role.controller";

const departmentRouter = Router();

departmentRouter.get("", defaultRolesActions.getDefaultRoles);
departmentRouter.get("/:id", defaultRolesActions.getOneDefaultRole);

export default departmentRouter;
