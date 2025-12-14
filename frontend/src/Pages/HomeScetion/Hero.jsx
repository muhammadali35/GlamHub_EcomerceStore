import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import React from "react";
import { Link } from "react-router-dom";

// ✅ Images unchanged
import costbg from "../../assets/HomeCosmat.png";
import mobilebg from "../../assets/HomeMobile1.png";
import kicthenbg from "../../assets/hero-kitchen.jpg";

const slides = [
  {
    id: 1,
    title: "Get Glowing, Buttery Skin — Naturally & Safely",
    subtitle: "Trusted Beauty & Skincare in Pakistan",
    description:
      "Explore dermatologist-approved cosmetics, serums & kits for radiant skin — affordable, fast delivery, all at GlamHub.",
    button: "SHOP NOW",
    bgImage: costbg,
    link: "/shop/cosmetics",
  },
  {
    id: 2,
    title: "Upgrade Your Tech with Sleek, Durable Gear",
    subtitle: "Top Mobile Accessories Loved in Pakistan",
    description: "Premium phone cases, fast chargers, wireless earbuds — stylish, reliable & made for everyday Pakistani life.",
    button: "SHOP NOW",
    bgImage: mobilebg,
    link: "/shop/mobile-accessories",
  },
  {
    id: 3,
    title: "Smart, Stylish Kitchen Tools — For Smarter Cooking",
    subtitle: "Modern Home Essentials, Delivered Fast",
    description: "Non-stick cookware, smart organizers & must-have gadgets — quality kitchen upgrades, just a click away.",
    button: "SHOP NOW",
    bgImage: kicthenbg,
    link: "/shop/kitchen-accessories",
  },
];

export default function Hero() {
  const swiperRef = React.useRef(null);

  // ✅ FIXED: Access swiper instance correctly
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
    <div className="w-full h-[520px] sm:h-[600px] md:h-[650px] lg:h-[520px] relative overflow-hidden">
      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        loop
        speed={1000}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            ></div>

            {/* Strong Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/40 md:to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center md:items-start justify-center text-center md:text-left px-6 sm:px-8 md:px-12 lg:px-20 py-10 md:py-14 max-w-lg lg:max-w-2xl mx-auto h-full">
              {/* Subtitle */}
              <span className="text-xs sm:text-sm md:text-base text-yellow-300 font-semibold tracking-wider uppercase mb-3 hero-animate-slideUp hero-delay-100 drop-shadow-md">
                + {slide.subtitle}
              </span>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4 hero-animate-slideUp hero-delay-200 drop-shadow-lg">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-gray-100 mb-6 hero-animate-slideUp hero-delay-300 max-w-md mx-auto md:mx-0 leading-relaxed">
                {slide.description}
              </p>

              {/* Button */}
              <Link
                to={slide.link}
                className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 hero-animate-slideUp hero-delay-400 active:scale-95"
              >
                {slide.button}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ DESKTOP: Side Buttons with Text */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-30 w-full px-6 lg:px-10">
          <button
          type="button"
          onClick={handlePrev}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-black text-lg rounded-full shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition-all"
        >
          ‹
        </button>

        <div className="flex-1"></div>

          <button
          type="button"
          onClick={handleNext}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-black text-lg rounded-full shadow-md cursor-pointer hover:bg-yellow-500 hover:text-white transition-all"
        >
          ›
        </button>
      </div>

      {/* ✅ MOBILE: Bottom Full-Width Buttons — Exactly like before, but with "PREV ‹" and "NEXT ›" */}
      <div className="md:hidden absolute bottom-4  right-4 z-30 flex justify-between gap-3">
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
    </div>
  );
}