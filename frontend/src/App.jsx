import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/NavBar";
import Home from "./Pages/HomeScetion/Home";
import Shop from "./Pages/Shopsection/Shop";
import ProductView from "./Pages/Shopsection/ProductView";
import { ShopProvider } from ".//context/ShopContext";
import Cart from "./Pages/CartSection/Cart";
import Favorites from "./Pages/Favorites/Favorites";
import Checkout from "./Pages/CartSection/Checkout";
import ScrollToTop from "./Components/ScrollToTop";
function App() {
  return (
    <>
    <ShopProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:category/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </ShopProvider>
     
    </>
  );
}

export default App;