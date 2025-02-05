import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  return (
    <nav>
      <h1>My Shoe Collection</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/collection">Shoe Collection</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        {/* Use Link component for Add Shoe navigation */}
        <Link to="/add-shoe">
          <button>Add Shoe</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
