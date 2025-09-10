import React from "react";
import cosmatic from "./../../assets/cosmat1.jpg";
import mobile from "./../../assets/mobile1.jpg";
import Kitchen from "./../../assets/Kitchen1.jpg";
import { Link } from "react-router-dom";

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
];

export default function Categories() {
  return (
    <section className="py-12 bg-white text-black">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gold">
              Shop by Categories
            </h2>
            <p className="mt-2 text-sm md:text-base opacity-90">
              Easily Explore Our Carefully Curated Categories
            </p>
          </div>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <Link to={cat.link} key={idx}>
              <div
                className="relative group rounded-2xl shadow-md overflow-hidden h-64 cursor-pointer"
                style={{
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition"></div>

                {/* Text Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
                  <h3 className="text-xl font-semibold">{cat.name}</h3>
                  <p className="text-sm mt-1 opacity-90">
                    {cat.products} Products
                  </p>
                  <span className="mt-4 inline-block px-4 py-2 bg-brand-gold text-black font-medium rounded-md group-hover:bg-brand-gold-dark transition">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
