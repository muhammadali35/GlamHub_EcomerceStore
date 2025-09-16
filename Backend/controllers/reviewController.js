// controllers/reviewController.js
import Review from "../models/ReviewModel.js";

// ✅ GET all reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 }); // latest first
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ POST new review
export const addReview = async (req, res) => {
  try {
    const { productId, name, email, rating, comment } = req.body;

    if (!productId || !name || !rating || !comment) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newReview = new Review({
      productId,
      name,
      email,
      rating,
      comment,
      verified: true, // tum isko later user auth ke saath manage kar sakte ho
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Server error" });
  }
};