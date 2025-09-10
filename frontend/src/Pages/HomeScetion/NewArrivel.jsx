import React from "react";
import ProductCard from "../../Components/Cards/ProductCard";
import { productsData } from "../../Components/DumyProducts";
import perfum from "./../../assets/perfum.webp";

const newArrivalProducts = [
  {
    id: 1,
    name: "Luxury Lipstick",
    price: 25,
    img:perfum,
    category: "cosmetics",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 45,
    img:perfum ,
    category: "mobile-accessories",
  },
  {
    id: 3,
    name: "Modern Blender",
    price: 65,
    img:perfum ,
    category: "kitchen-accessories",
  },
  {
    id: 4,
    name: "Face Serum",
    price: 35,
    img:perfum ,
    category: "cosmetics",
  },
];
const sliceProducts = newArrivalProducts.slice(0, 3); // Limit to 6 products


const NewArrivel = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gold">
            New Arrival Products
          </h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Discover the latest additions to our collection
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sliceProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currentCategory={product.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivel;
