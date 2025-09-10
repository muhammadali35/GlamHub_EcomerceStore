import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";
import logo from "../../assets/logo.jpg";
import { useShop } from "../../context/ShopContext";



function Navbar() {
  const [cartCount] = useState(1);
  const [wishlistCount] = useState(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const { cart, favorites } = useShop();
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-brand-gold hover:text-green-800 transition"
          >
            <img
              src={logo}
              alt="GlumHub Logo"
              className="w-10 h-10 object-contain rounded-full shadow-md border border-green-200"
            />
            <span className="tracking-wide  font-bold text-yellow-400 drop-shadow-lg ">GlumHub</span>
          </Link>
        </div>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 font-medium relative">
          <Link to="/" className="hover:text-brand-gold hover:bg-green-50 px-4 py-2">
            HOME
          </Link>

          {/* Shop with Dropdown */}
          <div className="relative group">

            {/* Dropdown */}
            <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded-md mt-2 w-40">

              <Link
                to="/shop/mobile-accessories"
                className="block px-4 py-2 hover:bg-green-50 hover:text-brand-gold"
              >
                Mobile Accessories
              </Link>
              <Link
                to="/shop/kitchen-accessories"
                className="block px-4 py-2 hover:bg-green-50 hover:text-brand-gold"
              >
                Kitchen Accessories
              </Link>
            </div>
          </div>

          <Link
            to="/shop/cosmetics"
            className="block px-4 py-2 hover:bg-green-50 hover:text-brand-gold"
          >
            Cosmetics
          </Link>
          <Link
            to="/shop/mobile-accessories"
            className="block px-4 py-2 hover:bg-green-50 hover:text-brand-gold"
          >
            Mobile Accessories
          </Link>
          <Link
            to="/shop/kitchen-accessories"
            className="block px-4 py-2 hover:bg-green-50 hover:text-brand-gold"
          >
            Kitchen Accessories
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-6 text-gray-700">
        
          {/* Wishlist */}
          <div className="relative">
            <Link to='/favorites'>
              <button className="hover:text-brand-gold"     >
                <Heart size={20} />
              </button>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full px-1">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart" className="hover:text-brand-gold">
              <ShoppingCart size={20} />
            </Link>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full px-1">
                {cart.length}
              </span>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden hover:text-brand-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <Link
            to="/"
            className="block px-6 py-3 hover:bg-green-50 hover:text-brand-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            HOME
          </Link>

          <Link
            to="/shop/mobile-accessories"
            className="block px-6 py-3 hover:bg-green-50 hover:text-brand-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Mobile Accessories
          </Link>

          <Link
            to="/shop/kitchen-accessories"
            className="block px-6 py-3 hover:bg-green-50 hover:text-brand-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kitchen Accessories
          </Link>

          <Link
            to="/shop/cosmetics"
            className="block px-6 py-3 hover:bg-green-50 hover:text-brand-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Cosmetics
          </Link>

         
          </div>
      )}
    </nav>
  );
}

export default Navbar;
