import React, { useRef } from "react";
import cosmatic from "./../../assets/cosmat1.jpg";
import mobile from "./../../assets/mobile1.jpg";
import Kitchen from "./../../assets/Kitchen1.jpg";
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  {
    name: "Cosmetics",
    products: 12,
    image: cosmatic,
    link: "/shop/cosmetics",
  },
  {
    name: "Mobile Accessories",
    products: 8,
    image: mobile,
    link: "/shop/mobile-accessories",
  },
  {
    name: "Kitchen Accessories",
    products: 10,
    image: Kitchen,
    link: "/shop/kitchen-accessories",
  },
  {
    name: "Kitchen Accessories",
    products: 10,
    image: Kitchen,
    link: "/shop/kitchen-accessories",
  },
];


function Categories() {
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

  return (
    <section className="py-20 bg-white text-black">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-light text-[#111111]">
            <span className="font-extrabold text-brand-gold">Glamub</span> is a
            brand of <span className="font-bold">cosmetics</span>, also offering
            a wide range of <span className="font-bold">kitchen</span> and{" "}
            <span className="font-bold">mobile</span> accessories.
          </h2>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="relative"
          >
            {categories.map((cat, idx) => (
              <SwiperSlide key={idx}>
                <Link to={cat.link}>
                  <div className="group bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 text-center relative bg-[#FAFAFA]">
                      <h3 className="inline-block text-xl font-semibold group-hover:border-b-2 border-black">
                        {cat.name}
                      </h3>

                      {/* Hover Button */}
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

          {/* Custom Navigation Buttons: Only show if more than 3 categories */}
          {categories.length > 3 && (
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
}

export default Categories;
