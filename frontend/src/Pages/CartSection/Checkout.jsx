import React, { useState, useRef } from "react";
import { useShop } from "../../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  const { cart, setCart, quantities, setQuantities, increaseQuantity, decreaseQuantity } = useShop();
  const navigate = useNavigate();

  const SHIPPING_FEE = 150;
  const subtotal = cart.reduce((acc, item) => acc + item.price * (quantities[item.id] || 1), 0);
  const total = subtotal + SHIPPING_FEE;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCodOpen, setIsCodOpen] = useState(true);
  const [isOnlineOpen, setIsOnlineOpen] = useState(false);

  // 📍 Searchable City Input
  const [cityQuery, setCityQuery] = useState("");
  const cityInputRef = useRef(null);

  const allCities = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad",
    "Multan", "Sialkot", "Peshawar", "Hyderabad", "Quetta",
    "Sukkur", "Gujranwala", "Sargodha", "Bahawalpur", "Sahiwal",
    "Sheikhupura", "Larkana", "Okara", "Jhang", "Gujrat"
  ];

  const filteredCities = allCities.filter(city =>
    city.toLowerCase().includes(cityQuery.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCitySelect = (city) => {
    setForm({ ...form, city });
    setCityQuery("");
    if (cityInputRef.current) cityInputRef.current.blur();
  };

// ✅ Submit Order (Backend)
const submitOrderToServer = async (paymentMethodSelected) => {
  try {
    const fd = new FormData();
    fd.append("orderId", `ORDER_${Date.now()}`);
    fd.append("cart", JSON.stringify(cart));
    fd.append("quantities", JSON.stringify(quantities || {}));
    fd.append("customerInfo", JSON.stringify(form));
    fd.append("paymentMethod", paymentMethodSelected);

    // ⚡ yahan change kiya → totalAmount bhejna hoga
    fd.append("totalAmount", total);

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Order failed");

    // ✅ Success
    setCart([]);
    setQuantities({});
    localStorage.removeItem("cart");

    toast.success("✅ Order placed successfully!");
    setIsModalOpen(true);

    // Auto close modal and redirect
    setTimeout(() => {
      setIsModalOpen(false);
      navigate("/");
    }, 2000);
  } catch (err) {
    console.error("Order submit error:", err);
    toast.error("❌ Failed to place order. Try again.");
  }
};



  // ✅ Place Order Handler
  const handlePlaceOrder = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.address || !form.city) {
      toast.error("⚠️ Please fill all required fields");
      return;
    }

    if (paymentMethod === "cod") {
      // COD → directly submit
      submitOrderToServer("cod");
    } else {
      // Online → redirect to Payment page
      navigate("/payment", {
        state: {
          cart,
          quantities,
          customerInfo: form,
          orderId: `ORDER_${Date.now()}`,
          total,
          paymentMethod: "online"
        }
      });
    }
  };

  // ✅ Toggle Payment Options
  const toggleCod = () => {
    setIsCodOpen(!isCodOpen);
    if (!isCodOpen) setIsOnlineOpen(false);
  };

  const toggleOnline = () => {
    setIsOnlineOpen(!isOnlineOpen);
    if (!isOnlineOpen) setIsCodOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <ToastContainer />

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
          <p className="text-gray-500 mt-2 text-base">Complete your order in just a few steps</p>
        </div>
        <Link
          to="/cart"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-medium transition flex items-center space-x-2"
        >
          ← Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Billing Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl border">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Billing Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                placeholder="you@example.com"
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                placeholder="+92 300 1234567"
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
              <div className="relative">
                <input
                  ref={cityInputRef}
                  type="text"
                  value={form.city || cityQuery}
                  onChange={(e) => {
                    setCityQuery(e.target.value);
                    setForm({ ...form, city: "" });
                  }}
                  placeholder="Start typing to search city..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                />
                {cityQuery && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {filteredCities.map((city) => (
                      <li
                        key={city}
                        onClick={() => handleCitySelect(city)}
                        className="px-4 py-2 hover:bg-yellow-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        {city}
                      </li>
                    ))}
                    {filteredCities.length === 0 && (
                      <li className="px-4 py-2 text-gray-500">No cities found</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address *</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition resize-none"
                placeholder="House #, Street, Area"
              />
            </div>
          </div>
        </div>

        {/* Order Summary + Payment Methods */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-xl border sticky top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Order</h2>
            <div className="max-h-96 overflow-y-auto mb-8 pr-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-base">{item.name}</p>
                      <div className="flex items-center mt-3 space-x-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition text-base font-bold"
                        >
                          −
                        </button>
                        <span className="text-base font-semibold w-8 text-center">
                          {quantities[item.id] || 1}
                        </span>
                        <button
                          onClick={() => {
                            if ((quantities[item.id] || 1) < 10) increaseQuantity(item.id);
                          }}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition text-base font-bold"
                          disabled={(quantities[item.id] || 1) >= 10}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-800 ml-4">
                      Rs. {(item.price * (quantities[item.id] || 1)).toFixed(0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 text-base">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">Rs. {subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">Rs. {SHIPPING_FEE}</span>
              </div>
              <div className="border-t pt-4 mt-4 flex justify-between">
                <span className="font-bold text-xl">Total</span>
                <span className="font-bold text-xl text-yellow-600">Rs. {total.toFixed(0)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-10 space-y-5">
              {/* COD */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={toggleCod}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => {
                        setPaymentMethod("cod");
                        setIsCodOpen(true);
                        setIsOnlineOpen(false);
                      }}
                      className="h-4 w-4 text-yellow-600"
                    />
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                  {isCodOpen ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {isCodOpen && (
                  <div className="p-4 bg-gray-50 border-t">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Pay in cash when your order is delivered. No advance payment required.
                      <br />
                      <span className="text-xs text-gray-500 mt-1 block">
                        کیش آن ڈیلیوری — پارسل موصول ہونے پر رقم ادا کریں
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Online */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={toggleOnline}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "online"}
                      onChange={() => {
                        setPaymentMethod("online");
                        setIsOnlineOpen(true);
                        setIsCodOpen(false);
                      }}
                      className="h-4 w-4 text-yellow-600"
                    />
                    <span className="font-medium">Online Payment</span>
                  </div>
                  {isOnlineOpen ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {isOnlineOpen && (
                  <div className="p-4 bg-gray-50 border-t">
                    <p className="text-sm text-gray-600 mb-3">
                      Secure payment via JazzCash, EasyPaisa, Credit/Debit Cards.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <img src="/visa.png" alt="Visa" className="h-8" />
                      <img src="/mastercard.png" alt="MasterCard" className="h-8" />
                      <img src="/jazzcash.png" alt="JazzCash" className="h-8" />
                      <img src="/easypaisa.png" alt="Easypaisa" className="h-8" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-xl font-bold text-lg transition transform hover:scale-[1.02] active:scale-[0.98] shadow"
            >
              🚚 Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
        <Dialog.Panel className="relative bg-white rounded-2xl p-8 text-center shadow-2xl transform transition-all max-w-md w-full scale-100 animate-fadeIn">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <Dialog.Title className="text-2xl font-bold text-gray-800 mb-2">🎉 Order Confirmed!</Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-6">
            Thank you for your order. We’ll process it and contact you shortly.
          </Dialog.Description>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800 mb-6">
            <p>📦 Your order will be delivered in 4-7 business days.</p>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Checkout;
