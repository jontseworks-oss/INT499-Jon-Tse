import React from "react";
import { subscriptions } from "../Data"; // Make sure the path is correct

function Subscriptions({ addToCart, cart }) {
  return (
    <div className="streamlist-container" style={{ maxWidth: "600px" }}>
      <h1>EZTech Store</h1>

      {subscriptions.map((item) => {
        // Check if the subscription is already in cart
        const inCart = cart.some(cartItem => cartItem.id === item.id);

        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>

            <button
              onClick={() => addToCart(item)}
              disabled={item.category === "subscription" && inCart} // Disable if subscription already added
              style={{
                padding: "6px 12px",
                backgroundColor: item.category === "subscription" && inCart ? "#9ca3af" : "#3b82f6",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: item.category === "subscription" && inCart ? "not-allowed" : "pointer",
              }}
            >
              {item.category === "subscription" && inCart ? "Subscribed" : "Add to Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Subscriptions;
