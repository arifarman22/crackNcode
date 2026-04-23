import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/auth";
import { upload, uploadToCloudinary } from "../services/upload";
import { asyncHandler } from "../middleware/error";

const router = Router();

router.post("/image", authenticate, requireAdmin, upload.single("image"), asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "No image file provided" });
    return;
  }
  const url = await uploadToCloudinary(req.file.buffer, "uploads");
  res.json({ url });
}));

export default router;
