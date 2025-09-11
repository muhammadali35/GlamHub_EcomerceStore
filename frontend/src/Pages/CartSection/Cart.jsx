import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import FrontBanner from "../../Components/FrontBanner";
import logo from "../../assets/logo.jpg";

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

  // ✅ Subtotal calculate
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (quantities[item.id] || 1),
    0
  );

  return (
    <>
      <FrontBanner title="Shopping Cart" bgImage={logo} />

      {cart.length === 0 ? (
        <h2 className="text-center text-gray-600 mt-10 text-xl mb-9">
          Your Cart is Empty 🛒
        </h2>
      ) : (
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-brand-gold">
            Your Shopping Cart
          </h2>

          {/* ✅ Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Subtotal</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  {/* ✅ Product */}
                  <td className="flex items-center gap-4 px-4 py-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <span className="font-medium">{item.name}</span>
                  </td>

                  {/* ✅ Price */}
                  <td className="px-4 py-4">${item.price}</td>

                  {/* ✅ Quantity */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1 border rounded hover:bg-gray-100"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="px-3">
                        {quantities[item.id] || 1}
                      </span>
                      <button
                        className="px-3 py-1 border rounded hover:bg-gray-100"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* ✅ Subtotal */}
                  <td className="px-4 py-4">
                    ${(item.price * (quantities[item.id] || 1)).toFixed(2)}
                  </td>

                  {/* ✅ Remove Button */}
                  <td className="px-4 py-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Cart Totals */}
          <div className="mt-8 flex justify-end">
            <div className="bg-gray-50 p-6 rounded shadow w-full sm:w-1/3">
              <h3 className="text-xl font-bold mb-4">CART TOTALS</h3>
              <div className="flex justify-between text-lg mb-4">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <Link to="/checkout">
                <button className="w-full mt-4 bg-black text-white py-3 rounded hover:bg-brand-gold transition">
                  PROCEED TO CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
