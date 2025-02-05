import React from "react";

const CartItems = ({ cartItems, removeFromCart }) => {
  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index}>
            {/* Displaying Shoe Image */}
            {item.imageURL ? (
              <img src={item.imageURL} alt={item.name} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            ) : (
              <p>Image not available</p>
            )}
            <h3>{item.name}</h3>
            <p>{item.brand} - {item.category}</p>
            <p>Price: ${item.price}</p>
            <p>Items Left: {item.items_left}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
};

export default CartItems;
