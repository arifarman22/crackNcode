import { Router } from "express";
import { register, login, getProfile } from "../controllers/auth";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validators";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/profile", authenticate, getProfile);

export default router;
