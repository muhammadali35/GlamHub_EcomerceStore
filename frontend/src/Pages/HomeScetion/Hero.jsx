import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import costbg from "../../assets/cosmat2.jpg";
import mobilebg from "../../assets/mobile.jpeg";
import kicthenbg from "../../assets/kicthen.jpg";

const slides = [
  {
    id: 1,
    title: "Cosmetics Collection",
    description: "Discover the best in beauty with our premium cosmetics range.",
    button: "Shop Now",
    bgImage: costbg,
  },
  {
    id: 2,
    title: "Mobile Accessories",
    description: "Upgrade your gadgets with high-quality mobile accessories.",
    button: "Explore",
    bgImage: mobilebg,
  },
  {
    id: 3,
    title: "Smart Kitchen Essentials",
    description: "Everything you need to make your home kitchen smarter.",
    button: "Get Started",
    bgImage: kicthenbg,
  },
];

export default function Hero() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        effect="cube" // 👈 smooth fade transition
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
                  {slide.description}
                </p>
                <div className="mt-6 flex space-x-4">
                  <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-black hover:text-yellow-400 transition">
                    {slide.button}
                  </button>
                
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Arrows */}
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            color: #facc15; /* Tailwind yellow-400 */
            font-weight: bold;
            transition: 0.3s;
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            color: #000; /* black hover */
            background: #facc15;
            border-radius: 50%;
            padding: 8px;
          }
          /* Hide scrollbar */
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
