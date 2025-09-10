import React, { useState } from "react";
import { useShop } from "../../context/ShopContext";

const Checkout = () => {
const { cart, quantities } = useShop();

const subtotal = cart.reduce(
  (acc, item) => acc + item.price * (quantities[item.id] || 1),
  0
);


  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United States (US)",
    address: "",

  });
   const pakistanCities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Sialkot",
    "Peshawar",
    "Hyderabad",
    "Quetta",
    "Sukkur",
    "Gujranwala",
    "Sargodha",
    "Bahawalpur",
    "Sahiwal",
  ];


  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Billing Details */}
      <div className="lg:col-span-2 bg-gray-50 p-6 rounded-md shadow">
        <h2 className="text-xl font-bold mb-6">Billing Details</h2>

        <form className="space-y-5">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
             <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
             <div>
              <label className="block text-sm font-medium mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="email"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Country */}
           <div>
      <label className="block text-sm font-medium mb-1">
        City <span className="text-red-500">*</span>
      </label>
      <select
        name="city"
        value={form.city}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
      >
        <option value="">Select City</option>
        {pakistanCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Street address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="House number and street name"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
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
                    {item.name} × {item.qty || 1}
                  </td>
                  <td className="py-2 text-right">
                    ${(item.price * (item.qty || 1)).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2 font-semibold">Subtotal</td>
                <td className="py-2 text-right">${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2 font-bold">Total</td>
                <td className="py-2 text-right font-bold text-brand-gold">
                  ${subtotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="w-full bg-brand-gold text-white py-3 rounded hover:bg-yellow-600 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
