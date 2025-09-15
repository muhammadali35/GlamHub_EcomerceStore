import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/testimonial`);
        if (!response.ok) throw new Error("Failed to fetch testimonials");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]); // ✅ No fallback — empty array
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
      <span className="text-sm text-gray-500 ml-1">({rating})</span>
    </div>
  );

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="text-center mb-14 px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          What Our <span className="text-brand-gold">Customers Say</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Real reviews from real customers who love our products.
        </p>
      </div>

      {/* Arrows */}
      <button
        type="button"
        className="absolute left-40 bottom-56 w-12 h-12 flex items-center justify-center bg-white text-black text-xl rounded-lg shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition border border-yellow-400 z-20"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        ‹
      </button>
      <button
        type="button"
        className="absolute right-52 bottom-56 w-12 h-12 flex items-center justify-center bg-white text-black text-xl rounded-lg shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition border border-yellow-400 z-20"
        onClick={() => swiperRef.current?.slideNext()}
      >
        ›
      </button>

      {/* Show message if no data */}
      {testimonials.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No testimonials available yet.</p>
        </div>
      )}

      {testimonials.length > 0 && (
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          className="max-w-6xl mx-auto px-4"
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 h-auto transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
                <div className="mb-4 flex justify-center">
                  <img
                    src={item.Image || "https://via.placeholder.com/150"}
                    alt={item.product || "Product"}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border"
                  />
                </div>

                <h4 className="text-lg font-semibold text-gray-800 text-center mb-2">
                  {item.product || "Product"}
                </h4>

                <p className="text-gray-700 text-center text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                  “{item.message}”
                </p>

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                    </div>   
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                        Verified
                      </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default TestimonialSection;