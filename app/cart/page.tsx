"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import Link from "next/link";
import type { Cart } from "../lib";
import "./style.css";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const CartPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") ?? "{}"))
  }, [])

  return (
    <div>
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="mainFramea">
        <div className="cart-catalog">
          {
            Object.values(cart).filter(({ product_name }) => {
              const productName = product_name.toLowerCase();
              const searchWords = searchValue.toLowerCase().split(/\s+/);
              for (const searchWord of searchWords) {
                if (!productName.includes(searchWord)) {
                  return false;
                }
              }
              return true;
            }).map(({ product_id, product_story, product_story_title, product_name, price, quantity, GST, image_src, description, tags, Customizations_Available, Customization_Comments, Customization_Chosen }) =>
              <ProductCard
                key={product_id}
                product_id={product_id}
                title={product_name}
                price={price}
                quantity_selected={quantity}
                image_src={image_src}
                description={description}
                tags={tags}
                Customizations_Available={Customizations_Available}
                Customization_Comments={Customization_Comments}
                Customization_Chosen={Customization_Chosen}
                setCart={setCart}
                GST={GST}
                product_story={product_story}
                product_story_title={product_story_title}
              />
            )
          }
        </div>
        <div className="totalInfo">
          <div className="textInfo">
            <div>Delivery:</div> <div className="curInfo">At rate</div>
          </div>
          <div className="textInfo">
            <div>Total:</div> <div className="curInfo"> &#8377;{
              Object.values(cart)
                .map(({ price, quantity }) => price * quantity)
                .reduce((acc, rec) => acc + rec, 0)}</div>
          </div>
          <Link href={{ pathname: "/verification" }} className="checkoutBtn">Checkout</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
