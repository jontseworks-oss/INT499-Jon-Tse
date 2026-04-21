import React from "react";
import { subscriptions } from "../Data";

function Subscriptions({ addToCart, cart, setCart }) {
  
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="streamlist-container" style={{ maxWidth: "600px" }}>
      <h1>EZTech Store</h1>

      {subscriptions.map((item) => {
        const inCart = cart.some((c) => c.id === item.id);
        const isSubscription = item.category === "subscription";

        return (
          <div key={item.id} style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid #ccc"
          }}>
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>

            {inCart && isSubscription ? (
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ backgroundColor: "#ef4444", color: "white" }}
              >
                Unsubscribe
              </button>
            ) : (
              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Subscriptions;
