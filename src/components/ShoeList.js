import React from "react";
import ShoeCard from "./ShoeCard";

const ShoeList = ({ shoes, setEditingShoe, confirmDelete, addToCart }) => {
  return (
    <div>
      {shoes.map((shoe) => (
        <ShoeCard
          key={shoe.id}
          shoe={shoe}
          setEditingShoe={setEditingShoe}
          confirmDelete={confirmDelete}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ShoeList;

