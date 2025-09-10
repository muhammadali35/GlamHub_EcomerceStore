import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const Favorites = () => {
  const { favorites, addToCart, } = useShop();

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-brand-gold">
        Your Favorites
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t added any favorites yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden group relative hover:shadow-xl transition"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
                />

                {/* Hover Buttons Overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center space-y-3 opacity-0 group-hover:opacity-100 transition duration-300">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-white text-black font-medium px-4 py-2 rounded-full hover:bg-brand-gold hover:text-white transition w-40 shadow"
                  >
                    Add to Cart
                  </button>
                  <Link to={`/product/${product.category}/${product.id}`}>
                    <button className="bg-white text-black font-medium px-4 py-2 rounded-full hover:bg-brand-gold hover:text-white transition w-40 shadow">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-gold transition">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Premium {product.name}
                </p>
                <p className="text-2xl font-bold text-brand-gold mt-3">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
