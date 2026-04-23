import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { env } from "../config/env";

// Configure Cloudinary
if (env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
}

// Multer memory storage (no disk writes — works on serverless)
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed"));
  },
});

export async function uploadToCloudinary(buffer: Buffer, folder: string): Promise<string> {
  if (!env.CLOUDINARY_CLOUD_NAME) {
    // Fallback: return a data URI placeholder if Cloudinary not configured
    console.log("[Upload Mock] Cloudinary not configured, using placeholder");
    return `https://placehold.co/600x400/1a1a2e/6366f1?text=${folder}`;
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: `crackncode/${folder}`, format: "webp", quality: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    ).end(buffer);
  });
}
