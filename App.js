import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StreamList from "./components/StreamList";
import Movies from "./components/Movies";
import Cart from "./components/Cart";
import Subscriptions from "./components/Subscriptions";
import "./App.css";

function App() {
  // Initialize Cart from LocalStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("eztech_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Update LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("eztech_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    // RULE: Users restricted from adding more than one subscription at a time
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
      // Accessories can be added multiple times (increment quantity)
      setCart(cart.map((item) => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Add new item
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Calculate total items for Navbar
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
       <Route 
  path="/subscriptions" 
  element={<Subscriptions addToCart={addToCart} cart={cart} />} 
/>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
