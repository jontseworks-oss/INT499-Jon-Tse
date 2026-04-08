import React from "react";
import { subscriptions } from "../Data";

function Subscription({ addToCart }) {
  return (
    <div className="streamlist-container" style={{ maxWidth: "600px" }}>
      <h1>EZTech Store</h1>
      {subscriptions.map((item) => (
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
          <div>
            <strong>{item.name}</strong>
            <div>${item.price.toFixed(2)}</div>
            <div style={{ fontSize: "12px", color: "gray" }}>
              {item.category === "subscription" ? "Subscription" : "Accessory"}
            </div>
          </div>

          <button
            onClick={() => addToCart(item)}
            style={{
              padding: "6px 12px",
              backgroundColor: "#3b82f6",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
      <p style={{ marginTop: "20px", fontStyle: "italic", color: "#555" }}>
        Note: Only one subscription can be active at a time. Accessories can be added multiple times.
      </p>
    </div>
  );
}

export default Subscriptions;
