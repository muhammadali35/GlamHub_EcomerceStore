import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [quantities, setQuantities] = useState({});

  // 🛒 Add to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart; // already added
      } else {
        setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
        return [...prevCart, product];
      }
    });
  };

  // ➕ Increase quantity
  const increaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  // ➖ Decrease quantity
  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // ❌ Remove from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  // ❤️ Toggle favorites (add/remove)
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // remove if already in favorites
        return prev.filter((item) => item.id !== product.id);
      } else {
        // add if not in favorites
        return [...prev, product];
      }
    });
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        favorites,
        quantities,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        toggleFavorite,
        setQuantities,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
