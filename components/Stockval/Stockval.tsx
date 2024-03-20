"use client";
import React, { useState, useEffect } from "react";
import type { Cart } from "@/app/lib";

interface StockProps {
  product_id: string;
  product_name: string;
  price: number;
  image_src: string;
  description: string;
  tags: string[];
  GST: number;
  product_story: string;
  product_story_title: string;
}

const Stockval: React.FC<StockProps> = ({ product_id, product_name, price, image_src, description, tags, GST, product_story, product_story_title }) => {
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] =
    useState<Cart>({});

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
    setCart(cart);
    setQuantity(cart[product_id] ? cart[product_id]["quantity"] : 0);
  }, [])

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
    if (newQuantity === 0) {
      setCart(cart => {
        let newCart: Cart = {};
        for (const key in cart) {
          if (key === product_id) {
            continue;
          }
          newCart[key] = cart[key];
        }
        localStorage.setItem("cart", JSON.stringify(newCart))
        return newCart;
      })
    } else {
      if (cart.hasOwnProperty(product_id)) {
        cart[product_id]["quantity"] = newQuantity;
      } else {
        cart[product_id] = {
          product_name,
          price,
          quantity: newQuantity,
          GST: GST,
          image_src: image_src,
          product_id,
          description,
          tags,
          Customizations_Available: [],
          Customization_Comments: "",
          Customization_Chosen: "",
          product_story,
          product_story_title
        };
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  return (
    <div className="StockForm">
      <input
        type="number"
        className="QtyNum"
        min="0"
        value={quantity.toString()}
        onChange={handleQuantityChange}
      />
    </div>
  );
};

export default Stockval;
