import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { protectAdmin } from "../middlewere/authMiddleware.js";

const router = express.Router();


router.post("/register", protectAdmin, registerAdmin);


router.post("/login", loginAdmin);

export default router;
