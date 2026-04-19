import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/product";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { productSchema } from "../validators";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authenticate, requireAdmin, validate(productSchema), createProduct);
router.put("/:id", authenticate, requireAdmin, validate(productSchema), updateProduct);
router.delete("/:id", authenticate, requireAdmin, deleteProduct);

export default router;
