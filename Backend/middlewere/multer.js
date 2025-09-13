
import multer from "multer";
import path from "path";

// Files kahan save hongi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 'uploads/' folder mein save
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueName}${path.extname(file.originalname)}`);
  },
});

// Sirf images allow karo
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Sirf JPEG, PNG, ya WebP images allowed hain"), false);
  }
};

// Multer middleware jo reusable hai
const uploadFiles = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).fields([
  { name: "image", maxCount: 1 }, // Single primary image
  { name: "images", maxCount: 5 }, // Up to 5 additional images
]);

export default uploadFiles;
