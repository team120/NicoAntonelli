import { Router } from "express";
import * as grantActions from "./grant.controller";

const grantRouter = Router();

grantRouter.get("", grantActions.getGrants);
grantRouter.get("/:id", grantActions.getOneGrant);

export default grantRouter;