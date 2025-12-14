// src/components/Categories.jsx
import React, { useRef } from "react";
import cosmatic from "./../../assets/cosmat1.jpg";
import mobile from "./../../assets/mobile1.jpg";
import Kitchen from "./../../assets/Kitchen1.jpg";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  {
    name: "Cosmetics",
    image: cosmatic,
    link: "/shop/cosmetics",
  },
  {
    name: "Mobile Accessories",
    image: mobile,
    link: "/shop/mobile-accessories",
  },
  {
    name: "Kitchen Accessories",
    image: Kitchen,
    link: "/shop/kitchen-accessories",
  },
];

function Categories() {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section className="py-20 bg-white text-black relative overflow-hidden">
      {/* Decor Circles */}
      <div className="hidden md:block absolute -top-32 -right-32 w-96 h-96 bg-yellow-200 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="hidden md:block absolute -bottom-32 -left-32 w-96 h-96 bg-gray-300 rounded-full opacity-10 blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-0">
        <div className="text-center mb-16 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
            Discover the{" "}
            <span className="font-extrabold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              GlamHub
            </span>{" "}
            Collection
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
            Explore premium <span className="font-bold">cosmetics</span>, innovative{" "}
            <span className="font-bold">kitchen</span> essentials, and stylish{" "}
            <span className="font-bold">mobile</span> accessories — all in one place.
          </p>
        </div>

        <div className="relative px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-0">
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => {
              if (swiper) swiperRef.current = swiper;
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 1.1, centeredSlides: true },
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3.1 },
            }}
            className="pb-8"
          >
            {categories.map((cat, idx) => (
              <SwiperSlide key={idx} className="!flex !justify-center">
                <Link to={cat.link} className="w-full max-w-md">
                  <div className="group bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transform group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-6 text-center relative bg-[#FAFAFA] mt-auto">
                      <h3 className="inline-block text-xl font-semibold group-hover:border-b-2 border-black">
                        {cat.name}
                      </h3>
                      <div
                        className="
                          md:absolute md:left-1/2 md:transform md:-translate-x-1/2 
                          md:bottom-[1px] opacity-100 
                          md:opacity-0 md:group-hover:bottom-24 md:group-hover:opacity-100 
                          transition-all duration-500 mt-4 md:mt-0
                        "
                      >
                        <span className="inline-block px-8 py-2 bg-black rounded-full text-white font-medium shadow hover:bg-white hover:text-black transition">
                          Shop Now
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ✅ Arrows ONLY on mobile & small screens (below 768px) */}
          <button
            type="button"
            onClick={handlePrev}
            className="md:hidden absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-black text-xl sm:text-2xl rounded-full shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition transform hover:scale-110"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="md:hidden absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-black text-xl sm:text-2xl rounded-full shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition transform hover:scale-110"
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default Categories;