import React, { useState } from "react";
import { useShop } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";

const Checkout = () => {
  const { cart,setCart, quantities, increaseQuantity, decreaseQuantity } = useShop();
  const navigate = useNavigate();

  const SHIPPING_FEE = 150;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (quantities[item.id] || 1),
    0
  );

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

  const pakistanCities = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad",
    "Multan", "Sialkot", "Peshawar", "Hyderabad", "Quetta",
    "Sukkur", "Gujranwala", "Sargodha", "Bahawalpur", "Sahiwal",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "cod") {
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/");
         localStorage.removeItem("cart");
         setCart([]);
      }, 2000);
    } else {
      navigate("/payment");
    }
  
  };

  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Billing Details */}
      <div className="lg:col-span-2 bg-gray-50 p-6 rounded-md shadow">
        <h2 className="text-xl font-bold mb-6">Billing Details</h2>
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone *</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">City *</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select City</option>
              {pakistanCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Street Address *</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-md shadow">
        <h2 className="text-xl font-bold mb-6">Your Order</h2>
        <div className="border rounded-md p-4 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Product</th>
                <th className="text-right py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">
                    <div className="flex items-center space-x-3">
                      <span>{item.name}</span>
                      <div className="flex items-center space-x-2 bg-gray-200 rounded-md w-max">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-300 rounded-md transition"
                        >
                          −
                        </button>
                        <span className="w-6 h-6 flex items-center justify-center">
                          {quantities[item.id] || 1}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-300 rounded-md transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 text-right">
                    Rs. {(item.price * (quantities[item.id] || 1)).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2">Subtotal</td>
                <td className="py-2 text-right">Rs. {subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2">Shipping</td>
                <td className="py-2 text-right">Rs. {SHIPPING_FEE}</td>
              </tr>
              <tr>
                <td className="py-2 font-bold">Total</td>
                <td className="py-2 text-right font-bold text-brand-gold">
                  Rs. {total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>Cash on Delivery</span>
          </label>
          {paymentMethod === "cod" && (
            <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
              COD (Cash on Delivery) is a payment option that allows the buyer to pay when the product is delivered. <br />
              کیش آن ڈیلیوری رقم کی ادائیگی کا ایک ایسا ذریعہ ہے جو خریدار کو پارسل موصول ہونے کی صورت میں رقم ادا کرنے کی سہولت فراہم کرتا ہے
            </p>
          )}
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            <span>Online Payment</span>
          </label>
          {paymentMethod === "online" && (
            <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
              After clicking “Pay now”, you will be redirected to PAYFAST (Pay via Debit/Credit/Wallet/Bank Account) to complete your purchase securely.
              <div className="flex space-x-3 mt-2">
                <img src="/visa.png" alt="Visa" className="h-6" />
                <img src="/mastercard.png" alt="MasterCard" className="h-6" />
                <img src="/jazzcash.png" alt="JazzCash" className="h-6" />
                <img src="/easypaisa.png" alt="Easypaisa" className="h-6" />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-brand-gold text-white py-3 rounded hover:bg-yellow-600 transition"
        >
          Place Order
        </button>
      </div>

      {/* COD Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
          <Dialog.Title className="text-lg font-bold mb-2">Order Received</Dialog.Title>
          <Dialog.Description>
            Your order has been placed successfully. We will contact you soon.
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Checkout;