"use client";

import React, { useState } from "react";
import imgval from "./img.jpg";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "./Cartcard.css";

interface CartcardProps {
  product_id: string;
  product_name: string;
  price: number;
  GST: number;
  shipping: number;
  quantity_selected: number;
  setCart: React.Dispatch<React.SetStateAction<[string, string, number, number, number, number][]>>;
}

interface Product {
  product_name: string;
  price: number;
  quantity: number;
  GST: number;
  shipping: number;
}

interface Cart {
  [key: string]: Product;
}


const Cartcard: React.FC<CartcardProps> = ({
  product_id,
  product_name,
  price,
  GST,
  shipping,
  quantity_selected,
  setCart,
}) => {


  const handleRemoval = () => {
    const cartval= localStorage.getItem("cart");
    if(cartval){
      const jsonResp= JSON.parse(cartval)
      delete jsonResp[product_id]
      localStorage.setItem("cart", JSON.stringify(jsonResp))
    }

    setCart(cart => {
      // save to local storage here
      for(const item in cart){
        if(item[0] === product_id){
          console.log(cart[item])
        }
      }
      return cart.filter((arr) => arr[0] !== product_id)
    }
    )
  }

  const [quantity, setQuantity] = useState(quantity_selected);
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
    const cartval= localStorage.getItem("cart");
    if(cartval){
      const jsonResp= JSON.parse(cartval)
      jsonResp[product_id]["quantity"] = parseInt(event.target.value)
      localStorage.setItem("cart", JSON.stringify(jsonResp))
    }
  };

  return (
    <div className="imageContainer">
      <img src={imgval.src} className="productImage" alt="product"></img>
      <div className="textContainer">{product_name}</div>
      <div className="backdropFilter">
        <div className="lowerInfo">
          <div className="priceContainer">
            Price: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &#8377;{price}
          </div>
          <div className="priceContainer2">
            Total Price: &nbsp; &nbsp; &#8377;{price * quantity}
          </div>
          <div className="cartContainer">
            <div className="qtyBar">
              <span className="qtyText">Quantity: &nbsp;</span>
              <input
                className="inNum"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <span className="removeCart" onClick={handleRemoval}>
              <RemoveShoppingCartIcon className="imageLogo" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartcard;
