
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

router.post("/product", uploadFiles, createProduct);
router.get("/product", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", uploadFiles, updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
