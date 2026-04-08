import React, { useEffect } from "react";

function Cart({ cart, setCart }) {
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("eztech_cart", JSON.stringify(cart));
  }, [cart]);

  // Update quantity (only for accessories)
  const updateQuantity = (id, change) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          if (item.category === "subscription") return item; // Subscription always qty 1
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="streamlist-container" style={{ maxWidth: "700px" }}>
      <h1>Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center", padding: "20px" }}>
          Your cart is empty.
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <div>${item.price.toFixed(2)}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {item.category !== "subscription" && (
                  <>
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </>
                )}
                {item.category === "subscription" && <span>Qty: 1</span>}

                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "30px",
              textAlign: "right",
              borderTop: "2px solid #333",
              paddingTop: "20px",
            }}
          >
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button
              style={{
                backgroundColor: "#10b981",
                padding: "12px 24px",
                fontSize: "1rem",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                color: "white",
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
