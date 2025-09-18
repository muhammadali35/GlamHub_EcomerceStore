// routes/orderRoutes.js
import { Router } from "express";
import upload from "../middlewere/multer.js";
import { submitOrder } from "../controllers/orderController.js";

const router = Router();

router.post("/", upload.single("screenshot"), submitOrder);

export default router; 