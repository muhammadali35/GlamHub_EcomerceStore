import { useState, useRef, useEffect } from "react"; // ✅ useEffect import kiya
import { useParams, Link } from "react-router-dom";
import { productsData } from "../../Components/DumyProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useShop } from "../../context/ShopContext";
import ProductCard from "../../Components/Cards/ProductCard";

// ──────────────────────────────────────────────────────────────────────
// 🧩 COMPONENT: ProductView
// ──────────────────────────────────────────────────────────────────────
export default function ProductView() {
  const { category, id } = useParams();
  const { addToCart } = useShop();
  const API_URL = import.meta.env.VITE_API_URL;

  // ──────────────────────────────────────────────────────────────────────
  // 🎯 PRODUCT DATA SETUP
  // ──────────────────────────────────────────────────────────────────────
  const categoryProducts = productsData[category] || [];
  const product = categoryProducts.find((p) => p.id.toString() === id.toString());

  // If product not found
  if (!product) {
    return <p className="text-center py-20">Product not found</p>;
  }

  const relatedProducts = categoryProducts.filter((p) => p.id.toString() !== id.toString());
  const sliceProducts = relatedProducts.slice(0, 10);

  // ──────────────────────────────────────────────────────────────────────
  // 🛒 CART & QUANTITY STATE
  // ──────────────────────────────────────────────────────────────────────
  const [quantity, setQuantity] = useState(1);

  // ──────────────────────────────────────────────────────────────────────
  // 🖼️ SWIPER STATES
  // ──────────────────────────────────────────────────────────────────────
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);
  const relatedSwiperRef = useRef(null);

  // ──────────────────────────────────────────────────────────────────────
  // 📝 REVIEW STATES
  // ──────────────────────────────────────────────────────────────────────
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
    images: [],
  });

  // ──────────────────────────────────────────────────────────────────────
  // 🔄 EFFECT: LOAD REVIEWS WHEN PRODUCT LOADS
  // ──────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      setReviewsError(false);
      try {
        // ✅ Use product.id — not product._id (dummy data has "id")
        const response = await fetch(`${API_URL}/api/review/${product.id}`);
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
  }, [product.id]); // ✅ product.id — safe to use

  // ──────────────────────────────────────────────────────────────────────
  // 🎛️ HANDLERS
  // ──────────────────────────────────────────────────────────────────────

  // ➤ Quantity Handler
  const handleQtyChange = (type) => {
    if (type === "inc") {
      setQuantity(Math.min(10, quantity + 1));
    } else if (type === "dec") {
      setQuantity(Math.max(1, quantity - 1));
    }
  };

  // ➤ Review Form Handlers
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

  // ➤ Submit Review
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
          productId: product.id, // ✅ use product.id
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

  // ➤ Swiper Navigation
  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
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

  const stockStatus = product.inStock
    ? "Ready to Ship - In Stock"
    : "Out of Stock - Available on Backorder";

  const deliveryText = "Estimated Delivery: 4 to 7 days";

  // ──────────────────────────────────────────────────────────────────────
  // 🖥️ RENDER
  // ──────────────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto px-6 py-12">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* 🖼️ PRODUCT GALLERY */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative">
          <button
            type="button"
            onClick={handlePrev}
            className="absolute top-44 -left-6 z-10 w-14 h-14 flex items-center justify-center bg-white text-black text-3xl rounded-lg shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute top-44 -right-6 z-10 w-14 h-14 flex items-center justify-center bg-white text-black text-3xl rounded-lg shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition"
          >
            ›
          </button>

          <Swiper
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs, Autoplay]}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="rounded-xl shadow-lg"
          >
            {product.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt={`Product ${index + 1}`}
                    className="w-full h-[500px] object-cover transform transition-duration-500 hover:scale-110"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="mt-4"
          >
            {product.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-full h-28 object-cover border-2 rounded-md cursor-pointer transition hover:opacity-80 ${
                    thumbsSwiper?.activeIndex === index ? "border-yellow-500" : "border-gray-300"
                  }`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 🏷️ PRODUCT INFO */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col space-y-5">
          <div>
            <span className="text-xl text-gray-500 uppercase tracking-wide">
              {product.categories?.join(", ")}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mt-1">{product.name}</h1>
          </div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="text-2xl font-bold text-black">Rs {product.price}</div>
          <div className="mt-4">
            <p className="text-lg text-gray-500">
              <strong>Categories:</strong> {product.categories?.join(", ")}
            </p>
            <p className="text-lg text-gray-500 mt-1">
              <strong>Tags:</strong> {product.tags?.join(", ")}
            </p>
          </div>

          {product.inStock && (
            <div className="flex items-center space-x-3 mt-6 bg-gray-200 rounded-md w-max">
              <button
                onClick={() => handleQtyChange("dec")}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-300 rounded-md transition"
              >
                −
              </button>
              <span className="w-10 h-10 flex items-center justify-center">{quantity}</span>
              <button
                onClick={() => handleQtyChange("inc")}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-300 rounded-md transition"
              >
                +
              </button>
            </div>
          )}

          <div className="flex space-x-3 mt-6">
            {product.inStock ? (
              <>
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-brand-gold text-white px-6 py-3 rounded-md shadow hover:bg-black transition"
                >
                  ADD TO CART
                </button>
                <Link
                  onClick={() => addToCart(product, quantity)}
                  to="/checkout"
                  className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-md shadow hover:bg-gray-700 transition text-center"
                >
                  BUY NOW
                </Link>
              </>
            ) : (
              <div className="flex-1 bg-red-500 text-white px-6 py-3 rounded-md shadow text-center">
                Out of Stock
              </div>
            )}
          </div>

          <div className="mt-4 text-sm px-4 py-2 rounded-full w-max bg-gray-100">
            <span
              className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}
            >
              {stockStatus}
            </span>
          </div>
          <div className="mt-4 text-sm px-4 py-2 rounded-full w-max bg-gray-100">{deliveryText}</div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* 💬 CUSTOMER REVIEWS */}
      {/* ────────────────────────────────────────────────────────────────────── */}
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
                key={r._id || r.id} // ✅ fallback for dummy data
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

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* 🔄 RELATED PRODUCTS */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="relative">
          <button
            type="button"
            className="absolute -top-16 right-10 z-10 w-12 h-12 flex items-center justify-center bg-white text-black text-xl rounded-lg shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition border border-yellow-400"
            onClick={() => {
              if (relatedSwiperRef.current) relatedSwiperRef.current.slidePrev();
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute -top-16 -right-3 border border-yellow-400 z-10 w-12 h-12 flex items-center justify-center bg-white text-black text-xl rounded-lg shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition"
            onClick={() => {
              if (relatedSwiperRef.current) relatedSwiperRef.current.slideNext();
            }}
          >
            ›
          </button>

          <Swiper
            onSwiper={(swiper) => (relatedSwiperRef.current = swiper)}
            slidesPerView={3}
            spaceBetween={10}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            className="py-4"
          >
            {sliceProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard product={item} currentCategory={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}