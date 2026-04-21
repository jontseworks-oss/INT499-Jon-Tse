import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StreamList from "./components/StreamList";
import Movies from "./components/Movies";
import Cart from "./components/Cart";
import Subscriptions from "./components/Subscriptions";
import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("eztech_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      console.log("App can be installed!");
    });
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (product.category === "subscription") {
      const hasSubscription = cart.some(item => item.category === "subscription");

      if (hasSubscription && !existingItem) {
        alert("Warning: You can only have one active subscription in your cart!");
        return;
      }

      if (existingItem) {
        alert("Warning: This subscription is already in your cart!");
        return;
      }
    }

    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />

        {/* ✅ ONLY ONE subscriptions route */}
        <Route 
          path="/subscriptions" 
          element={
            <Subscriptions 
              addToCart={addToCart}
              cart={cart}
              setCart={setCart}
            />
          } 
        />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
