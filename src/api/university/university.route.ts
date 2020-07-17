import { Router } from "express";
import * as universityActions from "./university.controller";

const universityRouter = Router();

universityRouter.get("", universityActions.getAllUniversities);
universityRouter.get("/:id", universityActions.getOneUniversity);
// universityRouter.post('/api/users', universityActions.createUniversity);
// universityRouter.put('/api/users/:id', updateUniversity);
universityRouter.delete('/api/users/:id', universityActions.deleteUniversity);

export default universityRouter;
