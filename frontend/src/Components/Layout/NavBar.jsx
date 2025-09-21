import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import logo from "../../assets/logo.jpg";
import { useShop } from "../../context/ShopContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevCartLength, setPrevCartLength] = useState(0);
  const [prevFavoritesLength, setPrevFavoritesLength] = useState(0);
  const [cartPulse, setCartPulse] = useState(false);
  const [wishlistPulse, setWishlistPulse] = useState(false);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  const { cart, favorites } = useShop();

  // Detect cart/favorites change for animation
  useEffect(() => {
    if (cart.length > prevCartLength) {
      setCartPulse(true);
      setTimeout(() => setCartPulse(false), 600);
    }
    setPrevCartLength(cart.length);
  }, [cart.length, prevCartLength]);

  useEffect(() => {
    if (favorites.length > prevFavoritesLength) {
      setWishlistPulse(true);
      setTimeout(() => setWishlistPulse(false), 600);
    }
    setPrevFavoritesLength(favorites.length);
  }, [favorites.length, prevFavoritesLength]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Active link helper
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex wrapper fix for tablet screens */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ─── LOGO ───────────────────────────────────────────────────── */}
          <div className="flex items-center">
            <Link to="/" onClick={closeMobileMenu} className="flex items-center group">
              <div className="relative">
                <img
                  src={logo}
                  alt="GlumHub Logo"
                  className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-lg shadow-sm border border-yellow-200 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg blur opacity-20 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
              <span className="ml-2 md:ml-3 text-xl md:text-2xl font-extrabold bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 bg-clip-text text-transparent tracking-tight group-hover:scale-105 transition-transform duration-300">
                GlumHub
              </span>
            </Link>
          </div>

          {/* ─── DESKTOP NAV ────────────────────────────────────────────── */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-2">
            {[
              { to: "/", label: "HOME" },
              { to: "/shop/cosmetics", label: "Cosmetics" },
              { to: "/shop/mobile-accessories", label: "Mobile Accessories" },
              { to: "/shop/kitchen-accessories", label: "Kitchen Accessories" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMobileMenu}
                className={`px-4 py-2 md:px-5 md:py-3 text-sm md:text-base font-medium rounded-full transition-all duration-300 transform hover:-translate-y-0.5 ${
                  isActive(item.to)
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-700 hover:text-white hover:bg-black hover:shadow-md"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* ─── ICONS + MOBILE TOGGLE ─────────────────────────────────── */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Wishlist */}
            <div className="relative">
              <Link to="/favorites" onClick={closeMobileMenu}>
                <div
                  className={`p-2 rounded-full hover:bg-yellow-50 transition-all duration-300 relative transform hover:scale-110 ${
                    wishlistPulse ? "animate-ping-slow" : ""
                  }`}
                >
                  <Heart
                    size={20}
                    className="text-gray-700 hover:text-yellow-500 transition-colors duration-300"
                  />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-md">
                      {favorites.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Cart */}
            <div className="relative">
              <Link to="/cart" onClick={closeMobileMenu}>
                <div
                  className={`p-2 rounded-full hover:bg-yellow-50 transition-all duration-300 relative transform hover:scale-110 ${
                    cartPulse ? "animate-ping-slow" : ""
                  }`}
                >
                  <ShoppingCart
                    size={20}
                    className="text-gray-700 hover:text-yellow-500 transition-colors duration-300"
                  />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-md">
                      {cart.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 rounded-full hover:bg-gray-100 transition-all duration-300 active:scale-95"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-gray-800" />
              ) : (
                <Menu size={24} className="text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* ─── MOBILE MENU ─────────────────────────────────────────────── */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" />

            {/* Slide-in Menu */}
            <div
              ref={mobileMenuRef}
              className="fixed top-0 right-0 h-full w-80 md:hidden bg-white z-50 shadow-2xl transform transition-transform duration-400 ease-out"
              style={{ transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800">Menu</h2>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="text-gray-800" />
                </button>
              </div>

              {/* Links */}
              <div className="p-4">
                {[
                  { to: "/", label: "🏠 HOME" },
                  { to: "/shop/cosmetics", label: "💄 Cosmetics" },
                  { to: "/shop/mobile-accessories", label: "📱 Mobile Accessories" },
                  { to: "/shop/kitchen-accessories", label: "🍳 Kitchen Accessories" },
                ].map((item, index) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={`block py-4 px-5 text-lg font-medium rounded-xl mb-2 transition-all duration-300 transform hover:translate-x-1 active:scale-95 ${
                      isActive(item.to)
                        ? "bg-yellow-100 text-yellow-800 border-r-4 border-yellow-500"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                    style={{
                      animation: `slideInRight 0.4s ease-out forwards`,
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      transform: "translateX(20px)",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="block w-full py-3 text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-xl hover:from-yellow-600 hover:to-yellow-700 shadow-md transition-all transform hover:scale-105"
                >
                  🛒 View Cart ({cart.length})
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
