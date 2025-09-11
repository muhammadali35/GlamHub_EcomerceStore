import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import costbg from "../../assets/HomeCosmat.png";
import mobilebg from "../../assets/HomeMobile1.png";
import kicthenbg from "../../assets/HomeKitchen2.png";
import React from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Get Your Skin Buttery That You Feel",
    subtitle: "Beauty & Skin Care",
    price: "",
    description:
      "Borem Ipsum Dolor Sit Amet, Vim Id Assentior Moderatius Nelig Endis luvaret Est Per Et Inani Alienum.",
    button: "SHOP NOW",
    bgImage: costbg,
     link: "/shop/cosmetics",
  },
  {
    id: 2,
    title: "Upgrade Your Gadgets",
    subtitle: "Mobile Accessories",
    price: "",
    description: "Discover premium accessories designed for style and performance.",
    button: "SHOP NOW",
    bgImage: mobilebg,
    link: "/shop/mobile-accessories",
  },
  {
    id: 3,
    title: "Smart Kitchen Essentials",
    subtitle: "Modern Home Living",
    price: "",
    description: "Make cooking smarter with innovative kitchen tools.",
    button: "SHOP NOW",
    bgImage: kicthenbg,
     link: "/shop/kitchen-accessories",
  },
];

export default function Hero() {
  const swiperRef = React.useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="w-full h-[520px] sm:h-[600px] md:h-[650px] lg:h-[520px] relative overflow-hidden">
      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation, EffectFade]}  
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        effect="fade"
        loop
        speed={800}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            ></div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/70 opacity-100 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center md:items-start justify-center text-center md:text-left px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-lg lg:max-w-2xl mx-auto h-full">
              {/* Subtitle */}
              <span className="text-xs sm:text-sm text-gray-600 font-medium tracking-wide uppercase mb-2 animate-fadeInUp">
                + {slide.subtitle}
              </span>

              {/* Main Title */}
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4 animate-fadeInUp">
                {slide.title}
              </h1>

              {/* Price */}
              {slide.price && (
                <p className="text-lg md:text-xl font-semibold text-yellow-500 mb-4 animate-fadeInUp">
                  {slide.price}
                </p>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-gray-800 mb-6 animate-fadeInUp">
                {slide.description}
              </p>

              {/* Button */}
              <Link to={slide.link} className="px-4 sm:px-5 py-2 sm:py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 animate-fadeInUp">
                {slide.button}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons - Bottom Right */}
      <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 md:right-8 md:bottom-8 z-30 flex gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handlePrev}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-black text-lg rounded-full shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition-all"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-black text-lg rounded-full shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition-all"
        >
          ›
        </button>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInUp:nth-child(1) {
          animation-delay: 0.2s;
        }
        .animate-fadeInUp:nth-child(2) {
          animation-delay: 0.4s;
        }
        .animate-fadeInUp:nth-child(3) {
          animation-delay: 0.6s;
        }
        .animate-fadeInUp:nth-child(4) {
          animation-delay: 0.8s;
        }
        .animate-fadeInUp:nth-child(5) {
          animation-delay: 1s;
        }
      `}</style>

      {/* Hide Default Swiper Buttons */}
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }

        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}