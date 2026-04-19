import { Router } from "express";
import { getServices, createService, updateService, deleteService } from "../controllers/service";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { serviceSchema } from "../validators";

const router = Router();

router.get("/", getServices);
router.post("/", authenticate, requireAdmin, validate(serviceSchema), createService);
router.put("/:id", authenticate, requireAdmin, validate(serviceSchema), updateService);
router.delete("/:id", authenticate, requireAdmin, deleteService);

export default router;
