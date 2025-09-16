import { useState, useRef} from "react";
import { useParams, Link } from "react-router-dom";
import { productsData } from "../../Components/DumyProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useShop } from "../../context/ShopContext";


// ✅ IMPORT NEW COMPONENTS
import ReviewSection from "./ReviewSection";
import RelatedProductsSection from "./RelatedProductsSection";

export default function ProductView() {
  const { category, id } = useParams();
  const { addToCart } = useShop();
  const API_URL = import.meta.env.VITE_API_URL;

  const categoryProducts = productsData[category] || [];
  const product = categoryProducts.find((p) => p.id.toString() === id.toString());

  if (!product) {
    return <p className="text-center py-20">Product not found</p>;
  }

  const relatedProducts = categoryProducts.filter((p) => p.id.toString() !== id.toString());
  const sliceProducts = relatedProducts.slice(0, 10);

  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);

  // ──────────────────────────────────────────────────────────────────────
  // 🎛️ HANDLERS
  // ──────────────────────────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────────────────────────
  // 🌟 UI HELPERS
  // ──────────────────────────────────────────────────────────────────────
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
      {/* 💬 CUSTOMER REVIEWS — IMPORTED COMPONENT */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <ReviewSection product={product} API_URL={API_URL} />

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* 🔄 RELATED PRODUCTS — IMPORTED COMPONENT */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <RelatedProductsSection sliceProducts={sliceProducts} category={category} />
    </div>
  );
}