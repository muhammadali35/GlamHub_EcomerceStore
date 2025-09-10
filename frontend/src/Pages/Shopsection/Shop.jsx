import { useParams } from "react-router-dom";
import { useState } from "react";

import cosmaticb from "./../../assets/cosmat.jpg";
import mobileb from "./../../assets/mobile.jpeg";
import Kitchenb from "./../../assets/Kicthen.jpg";
import { productsData } from "../../Components/DumyProducts";
import ProductCard from "../../Components/Cards/ProductCard"; // ✅ ProductCard import

// Category wise banner images
const bannerImages = {
  cosmetics: cosmaticb,
  "mobile-accessories": mobileb,
  "kitchen-accessories": Kitchenb,
};

export default function Shop() {
  const { category } = useParams();
  const currentCategory = category || "cosmetics";
  const [sort, setSort] = useState("default");

  let products = [...(productsData[currentCategory] || [])];

  // Sorting logic
  if (sort === "low-to-high") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "high-to-low") {
    products.sort((a, b) => b.price - a.price);
  }

  const bannerImage = bannerImages[currentCategory] || "/images/shop-banner.jpg";

  return (
    <div>
      {/* Top Banner */}
      <div
        className="h-60 flex items-center justify-center text-white text-4xl font-bold bg-center bg-cover relative"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative z-10 uppercase">
          {currentCategory.replace("-", " ")}
        </h1>
      </div>

      {/* Sort Options */}
      <div className="container mx-auto px-6 py-6 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="default">Sort by Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 pb-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentCategory={currentCategory}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No products available in this category.
          </p>
        )}
      </div>
    </div>
  );
}
