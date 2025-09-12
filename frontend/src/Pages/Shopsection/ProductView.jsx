import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productsData } from "../../Components/DumyProducts";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Toastify
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ProductCard
import ProductCard from "../../Components/Cards/ProductCard";

export default function ProductView() {
  const { category, id } = useParams();

  // Loading state for product details
  const [loading, setLoading] = useState(true);

  const categoryProducts = productsData[category] || [];
  const product = categoryProducts.find((p) => p.id.toString() === id.toString());
  const relatedProducts = categoryProducts.filter((p) => p.id.toString() !== id.toString());
  const sliceProducts = relatedProducts.slice(0, 10);

  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);
  const relatedSwiperRef = useRef(null);

  // ============ REVIEW SECTION STATE ============
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
    images: [],
  });

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Hussain Mughal",
      verified: true,
      rating: 5,
      comment: "Moonlight perfume smells amazing and lasts really well 😍",
      date: "3 weeks ago",
    },
    {
      id: 2,
      name: "Mahnoor",
      verified: true,
      rating: 4,
      comment: "Bohut he acha perfume.. zabardast fragrance hai.",
      date: "2 months ago",
    },
    {
      id: 3,
      name: "Muhammad Zohaib",
      verified: true,
      rating: 4,
      comment: "My order is dispatched. But I believe that it is amazing fragrance.",
      date: "1 month ago",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!review.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (review.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: review.name,
      verified: true,
      rating: review.rating,
      comment: review.comment,
      date: "Just now",
    };

    setReviews((prev) => [newReview, ...prev]);
    setReview({ name: "", email: "", rating: 0, comment: "", images: [] });
    setShowReviewForm(false);
    toast.success("Review submitted successfully!");
  };

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  // Inline Star Rating Component
  const StarRating = ({ rating, onRate }) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => onRate(i + 1)}
            className={`text-xl transition ${i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
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

  // ============ END REVIEW SECTION ============

  useEffect(() => {
    setLoading(true);
    // Simulate loading delay (e.g., API call)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2 seconds

    return () => clearTimeout(timer);
  }, [category, id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Image Skeleton */}
          <div className="relative">
            <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-xl mb-4"></div>
            <div className="flex space-x-2 mt-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-24 h-24 bg-gray-200 animate-pulse rounded-md"></div>
              ))}
            </div>
          </div>
          {/* Right - Info Skeleton */}
          <div className="flex flex-col space-y-5">
            <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="flex space-x-3 mt-6">
              <div className="h-12 w-32 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-12 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="h-8 w-1/2 bg-gray-200 animate-pulse rounded mt-4"></div>
            <div className="h-8 w-1/2 bg-gray-200 animate-pulse rounded mt-4"></div>
          </div>
        </div>
        {/* Reviews Skeleton */}
        <div className="mt-20">
          <div className="h-8 w-1/4 bg-gray-200 animate-pulse rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
        {/* Related Products Skeleton */}
        <div className="mt-20">
          <div className="h-8 w-1/4 bg-gray-200 animate-pulse rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-48 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center py-20">Product not found</p>;
  }

  const handleQtyChange = (type) => {
    if (type === "inc") {
      setQuantity(Math.min(10, quantity + 1));
    } else if (type === "dec") {
      setQuantity(Math.max(1, quantity - 1));
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const stockStatus = product.inStock
    ? "Ready to Ship - In Stock"
    : "Out of Stock - Available on Backorder";

  const deliveryText = "Estimated Delivery: 4 to 7 days";

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Toast Container — Placed here so you don’t need it in main.jsx */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Image Swiper */}
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
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="rounded-xl shadow-lg"
          >
            {product.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="overflow-hidden bg-[#F2F3F0] rounded-xl">
                  <img
                    src={img}
                    alt={`Product ${index + 1}`}
                    className="w-full h-[500px] object-contain transform transition-duration-500 hover:scale-110"
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
                  className="w-full h-28 object-cover border-2 rounded-md cursor-pointer transition hover:opacity-80 
                  ${thumbsSwiper?.activeIndex === index ? 'border-yellow-500' : 'border-gray-300'}"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right - Product Info */}
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

          <div className="flex space-x-3 mt-6">
            <button className="flex-1 bg-brand-gold text-white px-6 py-3 rounded-md shadow hover:bg-black transition">
              ADD TO CART
            </button>
            <button 
            className="bg-black text-white px-6 py-3 rounded-md shadow hover:bg-gray-800 transition">
              BUY IT NOW
            </button>
          </div>

          <div className="mt-4 text-sm px-4 py-2 rounded-full w-max bg-gray-100">
            <span
              className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"
                }`}
            >
              {stockStatus}
            </span>
          </div>
          <div className="mt-4 text-sm px-4 py-2 rounded-full w-max bg-gray-100">{deliveryText}</div>

        </div>
      </div>

      {/* ============ REVIEW SECTION ============ */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <button
          onClick={toggleReviewForm}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition mb-6"
        >
          Write a Review
        </button>

        {/* Review Form */}
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
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Send Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{r.name}</span>
                  <span className="text-xs text-gray-500">{r.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  <StarRating rating={r.rating} onRate={() => { }} />
                  {r.verified && (
                    <span className="text-xs text-green-600 ml-1">Verified</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 line-clamp-3">{r.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No reviews yet. Be the first to write one!</p>
        )}
      </div>
      {/* ============ END REVIEW SECTION ============ */}
      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="relative">
          {/* Custom Arrows */}
          <button
            type="button"
            className="absolute -top-16 right-10 z-10 w-12  h-12 flex items-center justify-center bg-white text-black text-xl rounded-lg shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition  border border-yellow-400  "
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

          {/* Swiper */}
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
            modules={[Navigation, Autoplay]} // Add Autoplay module
            autoplay={{ delay: 2000, disableOnInteraction: false }} // Add autoplay prop
            className="py-4"
          >
            {sliceProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard
                  product={item}
                  currentCategory={category}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}