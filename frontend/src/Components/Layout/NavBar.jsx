import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, ChevronDown } from "lucide-react";

function Navbar() {
  const [cartCount] = useState(1);
  const [wishlistCount] = useState(2);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            GlumHub
          </Link>
          <span className="w-36 ">🛍️</span>
        </div>

        {/* Middle: Nav Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          <Link to="/" className="hover:text-green-700 flex items-center">
            HOME 
          </Link>
          <Link to="/categories" className="hover:text-green-700 flex items-center">
          Categories   <ChevronDown size={16} className="ml-1" />
          </Link>
       
          <Link to="/features" className="hover:text-green-700 flex items-center">
            FEATURES   <ChevronDown size={16} className="ml-1" />
          </Link>
          <Link to="/contact" className="hover:text-green-700">
            CONTACT
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-6 text-gray-700">
          <button><Search size={20} /></button>
          <button><User size={20} /></button>

          {/* Wishlist */}
          <div className="relative">
            <button><Heart size={20} /></button>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full px-1">
                {wishlistCount}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <button><ShoppingCart size={20} /></button>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;