import { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem("favorites");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const [quantities, setQuantities] = useState({});
  const [checkoutForm, setCheckoutForm] = useState({});

  // 🛒 Save cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ❤️ Save favorites in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 🛒 Add to cart
const addToCart = (product) => {
  setCart((prevCart) => {
    const exists = prevCart.find((item) => item._id === product._id);
    if (exists) {
      setQuantities((prev) => ({
        ...prev,
        [product._id]: (prev[product._id] || 1) + 1,
      }));
      return prevCart;
    } else {
      setQuantities((prev) => ({ ...prev, [product._id]: 1 }));
      return [...prevCart, product];
    }
  });
};


  // ➕ Increase quantity
  const increaseQuantity = (id) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      if (currentQty >= 10) return prev; // Prevent more than 10
      return { ...prev, [id]: currentQty + 1 };
    });
  };

  // ➖ Decrease quantity
  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // ❌ Remove from cart
const removeFromCart = (_id) => {
  setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
  setQuantities((prev) => {
    const newQuantities = { ...prev };
    delete newQuantities[_id];
    return newQuantities;
  });
};


  // ❤️ Toggle favorites
 const toggleFavorite = (product) => {
  setFavorites((prev) => {
    const exists = prev.find((item) => item._id === product._id);
    if (exists) {
      return prev.filter((item) => item._id !== product._id);
    } else {
      return [...prev, product];
    }
  });
};

  return (
    <ShopContext.Provider
      value={{
        setCart,
        cart,
        favorites,
        quantities,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        toggleFavorite,
        setQuantities,
        checkoutForm,
        setCheckoutForm,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
