import { Router } from "express";
import usersRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

export default router;
