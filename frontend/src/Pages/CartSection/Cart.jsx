import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import FrontBanner from "../../Components/FrontBanner";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    quantities,
    setQuantities,
    increaseQuantity,
    decreaseQuantity,
  } = useShop();

  // ✅ Default quantity set
  React.useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = quantities[item.id] || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  // ✅ Calculate totals
  const SHIPPING_FEE = 150;
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (quantities[item.id] || 1),
    0
  );
  const total = subtotal + SHIPPING_FEE;

  return (
    <>
      <FrontBanner title="🛒 Your Cart" />

    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        {cart.length === 0 ? (
          /* ──────────────────────────────── */
          /* 🛒 EMPTY CART — PREMIUM STYLE */
          /* ──────────────────────────────── */
          <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white rounded-3xl mx-auto max-w-3xl">
            <div className="text-8xl mb-6">🛍️</div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
              Looks like you haven’t added any items yet. Explore our collection and find something you’ll love!
            </p>
            <Link
              to="/"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ──────────────────────────────── */}
            {/* 🛍️ CART ITEMS — PREMIUM CARDS */}
            {/* ──────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-extrabold text-gray-800">Shopping Cart</h2>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-600 hover:text-black transition flex items-center space-x-1"
                >
                  ← Continue Shopping
                </Link>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="md:w-48 h-48 md:h-auto flex-shrink-0 relative overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{item.name}</h3>
                        <p className="text-2xl font-extrabold text-black mt-2">
                          Rs. {item.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="mt-6">
                        {/* Quantity */}
                        <div className="flex items-center space-x-4">
                          <label className="text-sm font-medium text-gray-600">Qty:</label>
                          <div className="flex items-center bg-gray-100 rounded-full p-1">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:text-black rounded-full transition"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-medium">
                              {quantities[item.id] || 1}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:text-black rounded-full transition"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm text-gray-500 ml-4">
                            Rs. {(item.price * (quantities[item.id] || 1)).toLocaleString()}
                          </span>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-4 text-red-500 hover:text-red-700 font-medium flex items-center space-x-2 transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Remove item</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <div className="pt-6 border-t border-gray-200">
                <Link
                  to="/"
                  className="inline-flex items-center text-gray-600 hover:text-black font-medium transition"
                >
                  ← Back to shopping
                </Link>
              </div>
            </div>

            {/* ──────────────────────────────── */}
            {/* 💰 ORDER SUMMARY — PREMIUM STYLE */}
            {/* ──────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-6 border">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-medium">Rs. {SHIPPING_FEE}</span>
                  </div>
                  <div className="border-t pt-4 mt-2 flex justify-between">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-black">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link to="/checkout">
                  <button className="w-full mt-8 bg-black hover:bg-gray-800 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    🚚 Proceed to Checkout
                  </button>
                </Link>

                <div className="mt-6 p-4 bg-white border border-gray-200 rounded-xl">
                  <p className="text-xs text-gray-500 text-center">
                    Secure checkout • Easy returns • 7-day support
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;