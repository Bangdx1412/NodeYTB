import { Router } from "express";
import authController from "../controllers/auth.js";
const router = Router();

router.post("/auth/regster", authController.register);
router.post("/auth/login", authController.login);

export default router;