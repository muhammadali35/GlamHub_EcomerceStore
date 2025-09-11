import React from "react";
import ProductCard from "../../Components/Cards/ProductCard";
import { Link } from "react-router-dom";
import { productsData } from "../../Components/DumyProducts";

const HotSelling = () => {
  const hotSellingProducts = [
    ...productsData.cosmetics.filter((product) => product.hotsale),
    ...productsData["mobile-accessories"].filter((product) => product.hotsale),
    ...productsData["kitchen-accessories"].filter((product) => product.hotsale),
  ];

  const sliecedProducts1 = hotSellingProducts.slice(2, 4);
  const sliecedProducts2 = hotSellingProducts.slice(4, 6);

  // Banner ke liye products
  let firstProducts = hotSellingProducts[0];
  let secondProducts = hotSellingProducts[1];

  return (
    <div className="mt-5 my-10 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-8">
        <h1 className="font-mono text-black text-3xl md:text-4xl lg:text-5xl pb-2">
          Hot <span className="text-brand-gold">Selling</span> Products
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Hen an unknown printer took galley type and scrambled
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {/* 1st Row */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {/* Big Banner Div */}
          {firstProducts && (
            <div className="flex flex-col sm:flex-row border w-full md:w-1/2 min-h-[380px] md:h-[460px] p-5 bg-[#f2dace] rounded-lg shadow-lg hover:scale-105 duration-300 cursor-pointer">
              {/* Left Side Text */}
              <div className="flex flex-col justify-center items-start flex-1 p-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {firstProducts.name}
                </h3>
                <p className="text-base md:text-lg text-gray-600 mb-6">
                  Rs: {firstProducts.price}.00
                </p>

                <Link to={`/product/${firstProducts.category}/${firstProducts.id}`}>
                  <button className="px-6 md:px-8 py-2 bg-black text-white rounded-full font-medium shadow hover:bg-gray-800 transition">
                    SHOP NOW
                  </button>
                </Link>
              </div>

              {/* Right Side Image */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={firstProducts.img}
                  alt={firstProducts.name}
                  className="max-h-[180px] md:max-h-[250px] object-contain rounded-full"
                />
              </div>
            </div>
          )}

          {/* Smaller Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full md:w-1/2 ">
            {sliecedProducts1.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-[250px] md:w-[280px]   h-auto cursor-pointer mx-auto"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* 2nd Row */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {/* Smaller Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full md:w-1/2">
            {sliecedProducts2.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-[250px] md:w-[280px] h-auto cursor-pointer mx-auto"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Big Banner Div */}
          {secondProducts && (
            <div className="flex flex-col sm:flex-row border w-full md:w-1/2 min-h-[380px] md:h-[460px] p-5 bg-[#e9eeea] rounded-lg shadow-lg hover:scale-105 duration-300 cursor-pointer">
              {/* Left Side Text */}
              <div className="flex flex-col justify-center items-start flex-1 p-4">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
                  {secondProducts.name}
                </h3>
                <p className="text-base md:text-lg text-gray-700">
                  Rs: {secondProducts.price}.00
                </p>
                <button className="mt-6 px-6 md:px-8 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
                  SHOP NOW
                </button>
              </div>

              {/* Right Side Image */}
              <div className="flex-1 flex items-center justify-center mt-6 md:mt-0">
                <img
                  src={secondProducts.img}
                  alt={secondProducts.name}
                  className="max-h-[200px] md:max-h-[260px] w-auto object-contain"
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
