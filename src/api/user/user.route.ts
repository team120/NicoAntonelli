import { Router } from "express";
import * as userActions from "./user.controller";

const router = Router();

router.get("/users", userActions.getAllUsers);
router.get("/users/:id", userActions.getOneUser);

export default router;
