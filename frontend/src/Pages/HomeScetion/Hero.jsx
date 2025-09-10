import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import costbg from "../../assets/HomeCosmat.png";
import mobilebg from "../../assets/HomeMobile.png";
import kicthenbg from "../../assets/HomeKitchen1.png";

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
  },
  {
    id: 2,
    title: "Upgrade Your Gadgets",
    subtitle: "Mobile Accessories",
    price: "",
    description: "Discover premium accessories designed for style and performance.",
    button: "SHOP NOW",
    bgImage: mobilebg,
  },
  {
    id: 3,
    title: "Smart Kitchen Essentials",
    subtitle: "Modern Home Living",
    price: "",
    description: "Make cooking smarter with innovative kitchen tools.",
    button: "SHOP NOW",
    bgImage: kicthenbg,
  },
];

export default function Hero() {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Swiper */}
      <Swiper
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
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center md:items-start justify-center text-center md:text-left px-4 md:px-12 lg:px-20 py-6 md:py-10 max-w-lg lg:max-w-2xl h-full">
              {/* Subtitle */}
              <span className="text-xs md:text-sm text-gray-600 font-medium tracking-wide uppercase mb-2 animate-fadeInUp">
                + {slide.subtitle}
              </span>

              {/* Main Title */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black leading-snug md:leading-tight mb-4 animate-fadeInUp">
                {slide.title}
              </h1>

              {/* Price */}
              {slide.price && (
                <p className="text-lg md:text-2xl font-semibold text-yellow-500 mb-4 animate-fadeInUp">
                  {slide.price}
                </p>
              )}

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-6 animate-fadeInUp">
                {slide.description}
              </p>

              {/* Button */}
              <button className="px-5 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 animate-fadeInUp">
                {slide.button}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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

      {/* Hide Default Swiper Buttons & Scrollbar */}
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
