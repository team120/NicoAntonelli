import { Router } from "express";
import * as demoActions from "./demo.controller";

const router = Router();

router.get("/demo", demoActions.demo);

export default router;
