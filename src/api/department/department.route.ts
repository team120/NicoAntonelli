import { Router } from "express";
import * as departmentActions from "./department.controller";

const departmentRouter = Router();

departmentRouter.get("", departmentActions.getAllDepartments);
departmentRouter.get("/:id", departmentActions.getOneDepartment);
departmentRouter.post("", departmentActions.createDepartment);
/*TODO 

departmentRouter.put("/:id", departmentActions.updateDepartment);
departmentRouter.delete("/:id", departmentActions.deleteDepartment);
*/
export default departmentRouter;
