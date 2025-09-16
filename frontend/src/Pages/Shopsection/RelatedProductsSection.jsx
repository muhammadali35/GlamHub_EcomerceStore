// src/components/ProductView/RelatedProductsSection.jsx
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../../Components/Cards/ProductCard";

export default function RelatedProductsSection({ sliceProducts, category }) {
  const relatedSwiperRef = useRef(null);

  return (
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
  );
}