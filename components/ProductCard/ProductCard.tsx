"use client";

import React, { useState } from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "./ProductCard.css";
import type { Cart } from "@/app/lib";
import Link from "next/link";

interface ProductCardProps {
  product_id: string;
  title: string;
  price: number;
  GST: number;
  quantity_selected: number;
  image_src: string;
  description: string;
  tags: string[];
  Customizations_Available: string[];
  Customization_Comments: string;
  Customization_Chosen: string;
  product_story: string;
  product_story_title: string;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}


const ProductCard: React.FC<ProductCardProps> = ({
  product_id,
  title,
  price,
  GST,
  description,
  quantity_selected,
  image_src,
  tags,
  Customizations_Available,
  Customization_Comments,
  Customization_Chosen,
  product_story,
  product_story_title,
  setCart,
}) => {

  const [quantity, setQuantity] = useState(quantity_selected);

  const handleRemoval = () => {
    setQuantity(0);
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
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity)
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
      setCart((cart) => {
        if (cart.hasOwnProperty(product_id)) {
          cart[product_id]["quantity"] = newQuantity;
        } else {
          cart[product_id] = {
            product_name: title,
            quantity: newQuantity,
            price,
            GST,
            image_src,
            product_id,
            description,
            Customizations_Available,
            Customization_Comments,
            Customization_Chosen,
            tags,
            product_story,
            product_story_title,
          };
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart;
      })
    }
  };

  return (
    <div className="imageContainer">
      <img src={image_src} className="productImage" alt="product"></img>
      <div className="textContainer">{title}</div>
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
        <Link href={{
          pathname: `/product/${product_id}`, query: {
            product_id,
            title,
            price,
            image_src,
            description,
            GST,
            product_story,
            product_story_title,
            tags_str: JSON.stringify(tags),
          }
        }}>
          <div className="moreText">More Information</div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
