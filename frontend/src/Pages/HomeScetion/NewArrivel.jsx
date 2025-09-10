import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react"; // 👈 icons
import ProductCard from "../../Components/Cards/ProductCard";
import { productsData } from "../../Components/DumyProducts";

const NewArrivel = () => {
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
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
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

          {/* Custom Navigation Buttons */}
          <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 bg-brand-gold text-white p-3 rounded-full shadow-lg hover:bg-black transition hidden md:flex">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 bg-brand-gold text-white p-3 rounded-full shadow-lg hover:bg-black transition hidden md:flex">
            <ChevronRight className="w-6 h-6" />
          </button>

      </div>
        </div>
    </section>
  );
};

export default NewArrivel;
