// routes/orderRoutes.js
import { Router } from "express";
import upload from "../middlewere/multer.js";
import { submitOrder , getOrders  , getOrderById , deleteOrder , updateOrderStatus } from "../controllers/orderController.js";

const router = Router();

router.post("/", upload.single("screenshot"), submitOrder);

router.get("/", getOrders);           // Get all orders
router.get("/:id", getOrderById);     // Get single order
router.delete("/:id", deleteOrder);   // Delete order
router.patch("/:id/status", updateOrderStatus); // Update status

export default router; 