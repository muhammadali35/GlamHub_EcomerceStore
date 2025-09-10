import React from "react";
import { Link } from "react-router-dom"; // ✅ Link import
import { useShop } from "../../context/ShopContext";

const Cart = () => {
const { cart, removeFromCart, quantities,setQuantities, increaseQuantity, decreaseQuantity } = useShop();

  // Har product ki quantity track karne ke liye object


  // Jab cart change ho to har product ka quantity default 1 set karo
  React.useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = 1; // har product ka default quantity 1
    });
    setQuantities(initialQuantities);
  }, [cart]);

  // Increase function

  // Subtotal calculate (price × quantity)
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (quantities[item.id] || 1),
    0
  );

  return (
    <>
      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-brand-gold">
            Your Shopping Cart
          </h2>

          {/* Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Subtotal</th>
                <th className="px-4 py-3">Action</th> {/* ✅ new column */}
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="flex items-center gap-4 px-4 py-4">
                    <img src={item.img} alt={item.name} className="w-20 h-20" />
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-4">${item.price}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 border"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span>{quantities[item.id] || 1}</span>
                      <button
                        className="px-2 py-1 border"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    ${(item.price * (quantities[item.id] || 1)).toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    {/* ✅ Remove button */}
                    <button
                      onClick={() => removeFromCart(item)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="mt-8 flex justify-end">
            <div className="bg-gray-50 p-6 rounded shadow w-1/3">
              <h3 className="text-xl font-bold mb-4">CART TOTALS</h3>
              <div className="flex justify-between">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {/* ✅ Checkout button with Link */}
              <Link to="/checkout">
                <button className="w-full mt-4 bg-black text-white py-3 rounded">
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
