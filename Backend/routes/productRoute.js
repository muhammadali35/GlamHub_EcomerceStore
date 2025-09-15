import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import uploadFiles from "../middlewere/multer.js";

const router = express.Router();

// ✅ CREATE — Single image (thumbnail)
router.post("/product", uploadFiles.single("image"), createProduct);

// ✅ UPDATE — Multiple images (gallery)
router.put("/product/:id", uploadFiles.array("images", 5), updateProduct);

// ✅ GET & DELETE — no file upload
router.get("/product", getAllProducts);
router.get("/product/:id", getProductById);
router.delete("/product/:id", deleteProduct);

export default router;