import { useParams } from "react-router-dom";
import { useState } from "react";

// Import banner images
import cosmaticb from "./../../assets/cosmat.jpg";
import mobileb from "./../../assets/mobile.jpeg";
import Kitchenb from "./../../assets/Kicthen.jpg";

// Import dummy data and product card
import { productsData } from "../../Components/DumyProducts";
import ProductCard from "../../Components/Cards/ProductCard";

// Category-wise banner images
const bannerImages = {
  cosmetics: cosmaticb,
  "mobile-accessories": mobileb,
  "kitchen-accessories": Kitchenb,
};

export default function Shop() {
  const { category } = useParams();
  const currentCategory = category || "cosmetics";

  // State for price slider
  const [minPrice, setMinPrice] = useState(10);  // Default min
  const [maxPrice, setMaxPrice] = useState(500); // Default max

  // Toggle for price filter collapse
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  // Sorting state
  const [sort, setSort] = useState("default");

  // Load More state (only for unfiltered view)
  const [visibleProducts, setVisibleProducts] = useState(9);

  // Get products for current category
  let products = [...(productsData[currentCategory] || [])];

  // Check if any filter is active
  const hasActiveFilter = minPrice !== 10 || maxPrice !== 500;

  // Apply price filtering using slider values
  products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);

  // Apply sorting
  if (sort === "low-to-high") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "high-to-low") {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === "a-z") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "z-a") {
    products.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Show "Load More" only when no filter is applied
  const showLoadMore = !hasActiveFilter;

  // Load More handler
  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 9);
  };

  // Reset filter
  const resetFilter = () => {
    setMinPrice(10);
    setMaxPrice(500);
  };

  // Get banner image
  const bannerImage = bannerImages[currentCategory] || "/images/shop-banner.jpg";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div
        className="h-60 flex items-center justify-center text-white text-4xl font-bold bg-center bg-cover relative"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative z-10 uppercase">
          {currentCategory.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Left: Filters Sidebar */}
        <div className="md:w-64 space-y-4">
          {/* Filter by Price */}
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => setIsPriceOpen(!isPriceOpen)}
              className="w-full px-4 py-3 flex items-center justify-between text-left font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="font-medium">Filter by Prices</span>
              <span className="text-sm font-bold">{isPriceOpen ? '−' : '+'}</span>
            </button>
            {isPriceOpen && (
              <div className="p-4 pt-2 space-y-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <span>Price Pk{minPrice} — Pk{maxPrice}</span>
                  <button
                    onClick={resetFilter}
                    className="text-green-600 hover:text-green-800 text-xs"
                  >
                    Reset
                  </button>
                </div>
                <div className="relative">
                  {/* Single Range Input */}
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                  {/* Min Dot */}
                  <div
                    className="absolute top-0 left-0 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1 -translate-y-1"
                    style={{ left: `${((minPrice - 10) / 490) * 100}%` }}
                  ></div>
                </div>
                <div className="relative">
                  {/* Second Range Input (for max) */}
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                  {/* Max Dot */}
                  <div
                    className="absolute top-0 left-0 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1 -translate-y-1"
                    style={{ left: `${((maxPrice - 10) / 490) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Products Grid */}
        <div className="flex-1">
          {/* Sort Dropdown */}
          <div className="mb-6 flex justify-end">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="default">Sort by Default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="a-z">Name: A to Z</option>
              <option value="z-a">Name: Z to A</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.slice(0, hasActiveFilter ? undefined : visibleProducts).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentCategory={currentCategory}
                />
              ))
            ) : (
              <p className="col-span-full text-gray-600 text-center py-10">
                No products found matching your criteria.
              </p>
            )}
          </div>

          {/* Load More Button: Only if no filter is applied */}
          {showLoadMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium text-sm"
              >
                LOAD MORE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}