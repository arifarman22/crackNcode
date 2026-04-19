import { Router } from "express";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../controllers/course";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { courseSchema } from "../validators";

const router = Router();

router.get("/", getCourses);
router.post("/", authenticate, requireAdmin, validate(courseSchema), createCourse);
router.put("/:id", authenticate, requireAdmin, validate(courseSchema), updateCourse);
router.delete("/:id", authenticate, requireAdmin, deleteCourse);

export default router;
