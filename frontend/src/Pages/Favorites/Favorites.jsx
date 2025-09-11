import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { AiFillHeart } from "react-icons/ai"; // Filled heart for remove
import  FrontBanner  from "../../Components/FrontBanner";
import logo from "../../assets/logo.jpg";
const Favorites = () => {
  const { favorites, addToCart, toggleFavorite } = useShop();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    setFavList(favorites);
  }, [favorites]);

  return (
  <>
  <FrontBanner title="Favorites"  bgImage={logo}/>
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-brand-gold">
        Your Favorites
      </h2>

      {favList.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t added any favorites yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favList.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden group relative hover:shadow-2xl transition"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden bg-gray-100">
                <Link to={`/product/${product.category}/${product.id}`}>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </Link>

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

                {/* Remove Favorite Icon */}
                <button
                  onClick={() => toggleFavorite(product)} // remove from favs
                  className="absolute top-3 right-3 p-2 rounded-full shadow bg-white transition"
                >
                  <AiFillHeart className="text-black text-2xl" />
                </button>

                {/* View Button */}
                <Link to={`/product/${product.category}/${product.id}`}>
                  <button className="absolute top-14 right-3 bg-white text-black p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-500 hover:bg-black hover:text-white">
                    👁
                  </button>
                </Link>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 bg-black text-white font-medium px-4 py-2 rounded-full w-40 shadow opacity-0 group-hover:bottom-5 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-black"
                >
                  Add to Cart
                </button>
              </div>

              {/* Content Section */}
              <div className="p-6 text-center bg-[#fafafa]">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-gold transition">
                  {product.name}
                </h3>
                <p className="text-xl font-normal text-brand-gold mt-3">
                  Rs: {product.price}.00
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Premium {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
  );
};

export default Favorites;
