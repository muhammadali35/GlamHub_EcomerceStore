import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react"; // 👈 icons
import ProductCard from "../../Components/Cards/ProductCard";
import { productsData } from "../../Components/DumyProducts";

const NewArrivel = () => {
  const swiperRef = useRef(null);

  // Custom navigation handlers
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  // Extract only new arrival products from all categories
  const newArrivalProducts = [
    ...productsData.cosmetics.filter((p) => p.newarrival),
    ...productsData["mobile-accessories"].filter((p) => p.newarrival),
    ...productsData["kitchen-accessories"].filter((p) => p.newarrival),
  ];

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-mono text-black">
            New <span className=" text-brand-gold"> Arrival</span> Products
          </h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Discover the latest additions to our collection
          </p>
        </div>


        {/* Slider with Custom Navigation */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {newArrivalProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  product={product}
                  currentCategory={product.category}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {newArrivalProducts.length > 4 && (
            <>
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
            </>
          )}

      </div>
        </div>
    </section>
  );
};

export default NewArrivel;
