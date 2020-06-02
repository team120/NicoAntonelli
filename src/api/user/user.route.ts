import { Router } from "express";
import * as userActions from "./user.controller";

const router = Router();

router.get("/users", userActions.getAllUsers);

export default router;
