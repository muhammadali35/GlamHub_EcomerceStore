import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Heart icons

export default function ProductCard({ product, currentCategory }) {
  const { addToCart, toggleFavorite, favorites } = useShop(); 
  const [isFav, setIsFav] = useState(false);

  // Check if product is already favorite (on mount and when favorites update)
  useEffect(() => {
    const favExist = favorites.some((fav) => fav.id === product.id);
    setIsFav(favExist);
  }, [favorites, product.id]);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden group relative hover:shadow-xl transition">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-300">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500"></div>

        {/* Favorite Icon */}
        <button
          onClick={() => toggleFavorite(product)} // toggle from context
          className="absolute top-3 right-3 p-2 rounded-full shadow bg-white transition"
        >
          {isFav ? (
            <AiFillHeart className="text-red-500 text-2xl" />
          ) : (
            <AiOutlineHeart className="text-gray-700 text-2xl" />
          )}
        </button>

        {/* View Button (below favorite, visible only on hover) */}
        <Link to={`/product/${currentCategory}/${product.id}`}>
          <button className="absolute top-14 right-3 bg-white text-black p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-500 hover:bg-brand-gold hover:text-white">
            👁
          </button>
        </Link>

        {/* Add to Cart (bottom slide up on hover) */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 bg-white text-black font-medium px-4 py-2 rounded-full w-40 shadow opacity-0 group-hover:bottom-5 group-hover:opacity-100 transition-all duration-500 hover:bg-brand-gold hover:text-white"
        >
          Add to Cart
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-gold transition">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1">Premium {product.name}</p>
        <p className="text-2xl font-bold text-brand-gold mt-3">${product.price}</p>
      </div>
    </div>
  );
}
