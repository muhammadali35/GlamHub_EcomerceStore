// routes/reviewRoutes.js
import express from "express";
import { getProductReviews, addReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/:productId", getProductReviews); // GET reviews by product ID
router.post("/", addReview); // POST new review

export default router;