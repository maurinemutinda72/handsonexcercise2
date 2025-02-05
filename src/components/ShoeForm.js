import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShoeForm = ({ addShoe, updateShoe, editingShoe, setEditingShoe }) => {
  const [shoe, setShoe] = useState({
    name: "",
    brand: "",
    gender: "",
    category: "",
    price: "",
    is_in_inventory: true,
    items_left: "",
    imageURL: "",
  });

  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    if (editingShoe) {
      setShoe(editingShoe);
    }
  }, [editingShoe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoe({ ...shoe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingShoe) {
      updateShoe(shoe);
      setEditingShoe(null);
    } else {
      addShoe(shoe);
    }

    // Navigate back to Shoe Collection after adding/updating
    navigate("/collection");
  };

  return (
    <div className="form-container">
      <h2>{editingShoe ? "Edit Shoe" : "Add Shoe"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Shoe Name" value={shoe.name} onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Brand" value={shoe.brand} onChange={handleChange} required />
        <input type="text" name="gender" placeholder="Gender" value={shoe.gender} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={shoe.category} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={shoe.price} onChange={handleChange} required />
        <input type="number" name="items_left" placeholder="Items Left" value={shoe.items_left} onChange={handleChange} required />
        <input type="text" name="imageURL" placeholder="Image URL" value={shoe.imageURL} onChange={handleChange} required />
        
        <button type="submit">{editingShoe ? "Update Shoe" : "Add Shoe"}</button>
      </form>
    </div>
  );
};

export default ShoeForm;
