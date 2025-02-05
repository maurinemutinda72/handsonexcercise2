import React from "react";
import { Link } from "react-router-dom";

const ShoeCard = ({ shoe, setEditingShoe, confirmDelete, addToCart, cart }) => {
  const isInCart = cart ? cart.some(item => item.id === shoe.id) : false;

  return (
    <div className="shoe-card">
      {shoe.imageURL ? (
        <img src={shoe.imageURL} alt={shoe.name} className="shoe-image" />
      ) : (
        <p>Image not available</p>
      )}
      <h3>{shoe.name}</h3>
      <p>{shoe.brand} - {shoe.category}</p>
      <p>${shoe.price}</p>
      <p>Items Left: {shoe.items_left}</p>
      <button onClick={() => addToCart(shoe)}>
        {isInCart ? "Added to Cart" : "Add to Cart"}
      </button>
      {isInCart && (
        <button onClick={() => removeFromCart(shoe)}>Remove from Cart</button>
      )}
      {/* Modify Edit Button to Navigate to Form with shoe data */}
      <Link to="/add-shoe" onClick={() => setEditingShoe(shoe)}>
        <button>Edit</button>
      </Link>
      <button onClick={() => confirmDelete(shoe)}>Delete</button>
    </div>
  );
};

export default ShoeCard;
