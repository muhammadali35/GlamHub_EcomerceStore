import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotSelling = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [productsData, setProductsData] = useState([]);

  async function getHotProducts() {
    let response = await fetch(`${API_URL}/api/product`, {
      method: "GET",
    });
    let data = await response.json();
    if (response.ok) {
      setProductsData(data);
    }
  }

  useEffect(() => {
    getHotProducts();
  }, []);

  const hotSellingProducts = productsData.filter((product) => product.hotsale);

  const slicedProducts1 = hotSellingProducts.slice(2, 4);
  const slicedProducts2 = hotSellingProducts.slice(4, 6);

  let firstProducts = hotSellingProducts[0];
  let secondProducts = hotSellingProducts[1];

  return (
    <div className="mt-5 my-10 px-4 md:px-10 lg:px-20">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="font-mono text-black text-3xl md:text-4xl lg:text-5xl pb-2">
          Hot <span className="text-brand-gold">Selling</span> Products
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Hen an unknown printer took galley type and scrambled
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1st Row */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-7">
          {/* Big Banner Div */}
          {firstProducts && (
            <div className="flex flex-col md:flex-row border w-full md:w-1/2 min-h-[320px] md:h-[420px] lg:h-[460px] p-5 bg-[#f2dace] rounded-lg shadow-lg hover:scale-105 duration-300 cursor-pointer">
              {/* Text */}
              <div className="flex flex-col justify-center items-start flex-1 p-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {firstProducts.name}
                </h3>
                <p className="text-base md:text-lg text-gray-600 mb-6">
                  Rs: {firstProducts.price}.00
                </p>
                <Link
                  to={`/product/${firstProducts.category}/${firstProducts._id}`}
                >
                  <button className="px-6 md:px-8 py-2 bg-black text-white rounded-full font-medium shadow hover:bg-gray-800 transition">
                    SHOP NOW
                  </button>
                </Link>
              </div>
              {/* Image */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={firstProducts.image}
                  alt={firstProducts.name}
                  className="w-full max-w-[200px] md:max-w-[240px] lg:max-w-[260px] object-contain rounded-full"
                />
              </div>
            </div>
          )}

          {/* Smaller Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full md:w-1/2">
            {slicedProducts1.map((product) => (
              <div
                key={product._id}
                className="border p-5 rounded-lg shadow hover:scale-105 duration-300 cursor-pointer flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-[180px] md:max-w-[200px] h-[180px] md:h-[200px] object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-3">Rs: {product.price}.00</p>
                <Link to={`/product/${product.category}/${product._id}`}>
                  <button className="px-5 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
                    SHOP NOW
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 2nd Row */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          {/* Smaller Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full md:w-1/2">
            {slicedProducts2.map((product) => (
              <div
                key={product._id}
                className="border p-5 rounded-lg shadow hover:scale-105 duration-300 cursor-pointer flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-[180px] md:max-w-[200px] h-[180px] md:h-[200px] object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-3">Rs: {product.price}.00</p>
                <Link to={`/product/${product.category}/${product._id}`}>
                  <button className="px-5 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
                    SHOP NOW
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Big Banner Div */}
          {secondProducts && (
            <div className="flex flex-col md:flex-row border w-full md:w-1/2 min-h-[320px] md:h-[420px] lg:h-[460px] p-5 bg-[#e9eeea] rounded-lg shadow-lg hover:scale-105 duration-300 cursor-pointer">
              {/* Text */}
              <div className="flex flex-col justify-center items-start flex-1 p-4">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
                  {secondProducts.name}
                </h3>
                <p className="text-base md:text-lg text-gray-700">
                  Rs: {secondProducts.price}.00
                </p>
                <Link
                  to={`/product/${secondProducts.category}/${secondProducts._id}`}
                >
                  <button className="mt-6 px-6 md:px-8 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
                    SHOP NOW
                  </button>
                </Link>
              </div>
              {/* Image */}
              <div className="flex-1 flex items-center  justify-center mt-6 md:mt-0">
                <img
                  src={secondProducts.image}
                  alt={secondProducts.name}
                  className="w-full max-w-[200px] md:max-w-[240px] rounded-full lg:max-w-[260px] object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotSelling;
