import { Router } from "express";
import * as universityActions from "./university.controller";

const universityRouter = Router();

universityRouter.get("", universityActions.getUniversities);
universityRouter.get("/:id", universityActions.getOneUniversity);
universityRouter.post("", universityActions.createUniversity);
universityRouter.put("/:id", universityActions.updateUniversity);
universityRouter.delete("/:id", universityActions.deleteUniversity);

export default universityRouter;
