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
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-1 mb-3">
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading heartfelt reviews...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-yellow-100 rounded-full -z-10 blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-100 rounded-full -z-10 blur-3xl opacity-30"></div>

      <div className="text-center mb-16 px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-5 tracking-tight">
          What Our <span className="text-yellow-500">Customers Say</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          Real stories from real people who’ve experienced the difference.
        </p>
      </div>

      {/* Custom Navigation Arrows - Move to top right */}
      <div className="absolute  right-8 flex gap-4 z-20 ">
        <button
          type="button"
          className="w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm text-gray-800 text-2xl rounded-full shadow-lg cursor-pointer hover:bg-yellow-500 hover:text-white transition-all duration-300 border border-yellow-300"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous testimonial"
        >
          ‹
        </button>
        <button
          type="button"
          className="w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm text-gray-800 text-2xl rounded-full shadow-lg cursor-pointer hover:bg-yellow-500 hover:text-white transition-all duration-300 border border-yellow-300"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next testimonial"
        >
          ›
        </button>
      </div>

      {/* No testimonials message */}
      {testimonials.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.472-.828-6.086-2.182L10 17l4-4-4-4-4 4z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No testimonials available yet. Be the first to share!</p>
        </div>
      )}

      {testimonials.length > 0 && (
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 8,
            stretch: 0,
            depth: 150,
            modifier: 1.2,
            slideShadows: true,
          }}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          className="max-w-6xl mx-auto px-4 pb-10"
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
      
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="bg-white rounded-2xl shadow-xl p-7 md:p-8 h-auto transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 group">
                {/* Star Rating */}
                <StarRating rating={item.rating || 5} />

                {/* Avatar */}
                <div className="mb-5 flex justify-center">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={item.Image || "https://via.placeholder.com/150"}
                      alt={item.name || "Customer"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150?text=No+Image";
                      }}
                    />
                  </div>
                </div>

                {/* Product Name */}
                <h4 className="text-xl font-bold text-gray-800 text-center mb-3">
                  {item.product || "Amazing Product"}
                </h4>

                {/* Testimonial Message */}
                <p className="text-gray-700 text-center text-sm md:text-base leading-relaxed mb-5 px-2 line-clamp-4">
                  “{item.message}”
                </p>

                {/* Verified Badge & Name */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800">{item.name || "Anonymous"}</p>
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
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