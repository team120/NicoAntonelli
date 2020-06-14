import { Router } from "express";
import * as userActions from "./user.controller";

const router = Router();

router.get("", userActions.getAllUsers);
router.get("/:id", userActions.getOneUser);

export default router;
