// src/components/ProductView/ReviewSection.jsx (ya apni pasand ki path)
import { useState } from "react";
import { toast } from "react-toastify";

export default function ReviewSection({ product, API_URL }) {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });

  // ──────────────────────────────────────────────────────────────────────
  // 🔄 EFFECT: LOAD REVIEWS WHEN PRODUCT LOADS
  // ──────────────────────────────────────────────────────────────────────
  useState(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      setReviewsError(false);
      try {
        const response = await fetch(`${API_URL}/api/review/${product._id}`);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviewsError(true);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [product.id]);

  // ──────────────────────────────────────────────────────────────────────
  // 🎛️ HANDLERS
  // ──────────────────────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setReview((prev) => ({ ...prev, rating }));
  };

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!review.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (review.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setSubmittingReview(true);

    try {
      const response = await fetch(`${API_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          name: review.name,
          email: review.email,
          rating: review.rating,
          comment: review.comment,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      const newReview = await response.json();
      setReviews((prev) => [newReview, ...prev]);
      setReview({ name: "", email: "", rating: 0, comment: "" });
      setShowReviewForm(false);
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // 🌟 UI HELPERS
  // ──────────────────────────────────────────────────────────────────────
  const StarRating = ({ rating, onRate }) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => onRate(i + 1)}
            className={`text-xl transition ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            type="button"
            aria-label={`Rate ${i + 1} stars`}
          >
            ★
          </button>
        ))}
        <span className="text-sm text-gray-500 ml-2">{rating}/5</span>
      </div>
    );
  };

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {reviewsLoading && <p className="text-gray-500">Loading reviews...</p>}
      {reviewsError && <p className="text-red-500">Failed to load reviews.</p>}

      <button
        onClick={toggleReviewForm}
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition mb-6"
      >
        Write a Review
      </button>

      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
            <input
              type="text"
              name="name"
              value={review.name}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
            <input
              type="email"
              name="email"
              value={review.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your rating *</label>
            <StarRating rating={review.rating} onRate={handleRatingChange} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your review *</label>
            <textarea
              name="comment"
              value={review.comment}
              onChange={handleInputChange}
              rows={4}
              placeholder="Share your experience..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submittingReview}
            className={`${submittingReview ? "bg-gray-500" : "bg-gray-800 hover:bg-gray-700"} text-white px-4 py-2 rounded-md transition`}
          >
            {submittingReview ? "Submitting..." : "Send Review"}
          </button>
        </form>
      )}

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reviews.map((r) => (
            <div
              key={r._id || r.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">{r.name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(r.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <StarRating rating={r.rating} onRate={() => {}} />
                {r.verified && <span className="text-xs text-green-600 ml-1">Verified</span>}
              </div>
              <p className="text-sm text-gray-700 line-clamp-3">{r.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        !reviewsLoading && <p className="text-gray-500 italic">No reviews yet. Be the first to write one!</p>
      )}
    </div>
  );
}