
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

router.post(
  "/product",
  uploadFiles.fields([
    { name: "image", maxCount: 1 },     
    { name: "images", maxCount: 5 },      
  ]),
  createProduct
);
router.get("/product", getAllProducts);
router.get("/product/:id", getProductById);
router.put(
  "/product/:id",
  uploadFiles.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  updateProduct
);
router.delete("/product/:id", deleteProduct);

export default router;
  