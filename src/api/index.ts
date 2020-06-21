import { Router } from "express";
import usersRoutes from "./user/user.route";

const router = Router();

router.use("/users", usersRoutes);

export default router;
