import { useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";

// Import banner images
import cosmaticb from "./../../assets/cosmat.jpg";
import mobileb from "./../../assets/mobile.jpeg";
import Kitchenb from "./../../assets/Kicthen.jpg";

// Import dummy data and product card
// import { productsData } from "../../Components/DumyProducts";
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

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // States
  const [productsData, setProductsData] = useState([])
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [visibleProducts, setVisibleProducts] = useState(9);
  const [loading, setLoading] = useState(false);

  // Collapse toggle states
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isStockOpen, setIsStockOpen] = useState(true);


  async function getAllProducts() {

    let response = await fetch(`${API_BASE_URL}/api/product`, {
      method: "GET"
    })
    let data = await response.json()
    if (response.ok) {
      setProductsData(data)
    }
  }
  useEffect(() => {
    getAllProducts()
  }, [])

  // Get products
  let products = productsData.filter(
    (p) => p.category === currentCategory
  );



  // Stock counts
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;
  const AllStockCount = products.filter((p) => !p.Stock).length;

  // Check filters active
  const hasActiveFilter =
    minPrice !== "" || maxPrice !== "" || stockFilter !== "all";

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200); // ⏳ delay 1.2s
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, stockFilter, sort]);

  // Apply price filter
  if (minPrice !== "" || maxPrice !== "") {
    products = products.filter(
      (p) =>
        (minPrice === "" || p.price >= minPrice) &&
        (maxPrice === "" || p.price <= maxPrice)
    );
  }

  // Stock filter
  if (stockFilter === "in-stock") {
    products = products.filter((p) => p.inStock);
  } else if (stockFilter === "out-of-stock") {
    products = products.filter((p) => !p.inStock);
  }

  // Sorting
  if (sort === "low-to-high") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "high-to-low") {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === "a-z") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "z-a") {
    products.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Load More
  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 9);
  };

  // Reset filters
  const resetFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setStockFilter("all");
    setSort("default");
  };

  // Banner image
  const bannerImage =
    bannerImages[currentCategory] || "/images/shop-banner.jpg";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div
        className="h-60 flex items-center justify-center text-white text-4xl font-bold bg-center bg-cover relative"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative z-10 uppercase">
          {currentCategory
            .replace("-", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-64 space-y-4">
          {/* Price Filter */}
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => setIsPriceOpen(!isPriceOpen)}
              className="w-full px-4 py-3 flex items-center justify-between text-left font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="font-medium">Filter by Price</span>
              <span className="text-sm font-bold">
                {isPriceOpen ? "−" : "+"}
              </span>
            </button>

            {isPriceOpen && (
              <div className="p-4 pt-2 space-y-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <span>
                    Price Rs.{minPrice || 0} — Rs.{maxPrice || "∞"}
                  </span>
                  <button
                    onClick={resetFilter}
                    className="text-green-600 hover:text-green-800 text-xs"
                  >
                    Reset
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) =>
                      setMinPrice(e.target.value ? parseInt(e.target.value) : "")
                    }
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(e.target.value ? parseInt(e.target.value) : "")
                    }
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Stock Filter */}
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => setIsStockOpen(!isStockOpen)}
              className="w-full px-4 py-3 flex items-center justify-between text-left font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="font-medium">Filter by Stock</span>
              <span className="text-sm font-bold">
                {isStockOpen ? "−" : "+"}
              </span>
            </button>

            {isStockOpen && (
              <div className="p-4 pt-2 space-y-3 border-t border-gray-100">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="stock"
                    checked={stockFilter === "all"}
                    onChange={() => setStockFilter("all")}
                    className="text-green-600 focus:ring-green-500"
                  />
                  All ({AllStockCount})
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="stock"
                    checked={stockFilter === "in-stock"}
                    onChange={() => setStockFilter("in-stock")}
                    className="text-green-600 focus:ring-green-500"
                  />
                  In Stock ({inStockCount})
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="stock"
                    checked={stockFilter === "out-of-stock"}
                    onChange={() => setStockFilter("out-of-stock")}
                    className="text-green-600 focus:ring-green-500"
                  />
                  Out of Stock ({outOfStockCount})
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {/* Sort */}
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

          {/* Products or Loading */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-sm p-4 bg-white overflow-hidden"
                >
                  {/* Image Skeleton */}
                  <div className="w-full h-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-md mb-4"></div>
                  {/* Title Skeleton */}
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
                  {/* Price Skeleton */}
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-1/2 mb-4"></div>
                  {/* Button Skeleton */}
                  <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products
                    .slice(0, hasActiveFilter ? undefined : visibleProducts)
                    .map((product) => (
                      <ProductCard
                        key={product._id}
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

              {/* Load More */}
              {!hasActiveFilter && products.length > visibleProducts && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium text-sm"
                  >
                    LOAD MORE
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
