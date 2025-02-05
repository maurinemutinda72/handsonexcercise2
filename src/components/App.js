import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import ShoeList from "./ShoeList";
import ShoeForm from "./ShoeForm";
import Footer from "./Footer";
import CartItems from "./CartItems";

const App = () => {
  const [shoes, setShoes] = useState([]);
  const [editingShoe, setEditingShoe] = useState(null);
  const [cart, setCart] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [shoeToDelete, setShoeToDelete] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setShoes(data.shoes))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Add Shoe to Collection
  const addShoe = (newShoe) => {
    const updatedShoe = { id: Date.now(), ...newShoe };
    setShoes((prevShoes) => [...prevShoes, updatedShoe]);
  };

  // Delete Shoe from Collection
  const deleteShoe = () => {
    if (shoeToDelete) {
      setShoes(shoes.filter((shoe) => shoe.id !== shoeToDelete.id));
      setShowDeleteConfirmation(false);
      setShoeToDelete(null);
    }
  };

  // Update Shoe in Collection
  const updateShoe = (updatedShoe) => {
    setShoes(shoes.map((shoe) => (shoe.id === updatedShoe.id ? updatedShoe : shoe)));
    setEditingShoe(null);
  };

  // Add to Cart
  const addToCart = (shoe) => {
    if (shoe.items_left > 0) {
      setCart((prevCart) => {
        const isAlreadyInCart = prevCart.some((item) => item.id === shoe.id);
        if (!isAlreadyInCart) {
          const updatedShoe = { ...shoe, items_left: shoe.items_left - 1 };
          return [...prevCart, updatedShoe];
        }
        return prevCart;
      });
    }
  };

  // Remove from Cart
  const removeFromCart = (shoeId) => {
    setCart(cart.filter(item => item.id !== shoeId));
  };

  // Confirm Delete Function
  const confirmDelete = (shoe) => {
    setShoeToDelete(shoe);
    setShowDeleteConfirmation(true);
  };

  // Sorting function to sort shoes based on selected criteria and order
  const sortedShoes = [...shoes].sort((a, b) => {
    if (sortBy === "price" || sortBy === "items_left") {
      return sortOrder === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    } else if (sortBy === "name" || sortBy === "brand" || sortBy === "category" || sortBy === "gender") {
      const valA = a[sortBy]?.toLowerCase() || "";
      const valB = b[sortBy]?.toLowerCase() || "";
      return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return 0;
  });

  return (
    <Router>
      <div>
        <Navbar cartCount={cart.length} />
        
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-container">
                <h2>Welcome to My Shoe Collection!</h2>
                <p>Click on "Shoe Collection" to see the list of shoes.</p>
                <img
                  src="https://cdn.vectorstock.com/i/500p/15/20/sneakers-vector-231520.jpg"
                  alt="Shoe Collection"
                  className="home-image"
                />
              </div>
            }
          />
          <Route
            path="/collection"
            element={
              <>
                <div>
                  {/* Sorting Options */}
                  <div>
                    <label>Sort By: </label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="name">Name</option>
                      <option value="brand">Brand</option>
                      <option value="gender">Gender</option>
                      <option value="category">Category</option>
                      <option value="price">Price</option>
                      <option value="is_in_inventory">In Stock</option>
                      <option value="items_left">Items Left</option>
                    </select>
                    <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                      {sortOrder === "asc" ? "Ascending" : "Descending"}
                    </button>
                  </div>
                  <ShoeList shoes={sortedShoes} setEditingShoe={setEditingShoe} confirmDelete={confirmDelete} addToCart={addToCart} cart={cart} />
                </div>
              </>
            }
          />
          
          {/* Add Shoe Route */}
          <Route
            path="/add-shoe"
            element={
              <ShoeForm addShoe={addShoe} updateShoe={updateShoe} editingShoe={editingShoe} setEditingShoe={setEditingShoe} />
            }
          />

          {/* Cart Items */}
          <Route
            path="/cart"
            element={<CartItems cartItems={cart} removeFromCart={removeFromCart} />}
          />

          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome to My Shoe Collection!</h2>
                <p>Click on "Shoe Collection" to see the list of shoes.</p>
              </div>
            }
          />
        </Routes>

        {/* Delete Confirmation Pop-Up */}
        {showDeleteConfirmation && (
          <div className="delete-confirmation-popup">
            <p>Are you sure you want to delete this item?</p>
            <button onClick={deleteShoe}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        )}

        <Footer />
      </div>
    </Router>
  );
};

export default App;
