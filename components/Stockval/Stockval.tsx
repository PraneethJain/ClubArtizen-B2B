"use client";
import React, { useState } from "react";

interface StockProps {
  stock: number;
}

const Stockval: React.FC<StockProps> = ({ stock }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
  };

  return (
    <div className="StockForm">
      <div className="sampletext2">{stock} in Stock</div>
      <input
        type="number"
        className="QtyNum"
        min="1"
        value={quantity.toString()}
        onChange={handleQuantityChange}
      />
      <button className="CartButton">Add to Cart</button>
    </div>
  );
};

export default Stockval;
