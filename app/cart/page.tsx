"use client"

import React, { useEffect, useState } from "react";
import Cartcard from "@/components/Cartcard/Cartcard";
import "./style.css";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const page = () => {
  let curCart: [string, string, number, number, number, number][] = [];
  const localCart = localStorage.getItem("cart")
  if (localCart) {
    const cartJson = JSON.parse(localCart)
    for (const key in cartJson) {
      let jsonResp = cartJson[key]
      curCart.push(
        [
          key,
          jsonResp["product_name"],
          jsonResp["price"],
          jsonResp["quantity"],
          jsonResp["GST"],
          jsonResp["shipping"],
        ]
      )
    }
  }
  const [cart, setCart] = useState<[string, string, number, number, number, number][]>(curCart)

  return (
    <div>
      <nav><Navbar/></nav>
      <div className="mainFrame">
        <div className="catalogList">
          {cart.map(([product_id, product_name, price, quantity_selected, GST, shipping]) => (
            <Cartcard
              product_id={product_id}
              product_name={product_name}
              price={price}
              quantity_selected={quantity_selected}
              GST={GST}
              shipping={shipping}
              setCart={setCart}
            />
          ))}

        </div>
        <div className="totalInfo">
          <div className="textInfo">
            <div>Delivery:</div> <div className="curInfo">&#8377;100</div>
          </div>
          <div className="textInfo">
            <div>Total:</div> <div className="curInfo"> &#8377;1000</div>
          </div>
          <div className="checkoutBtn">Checkout</div>
        </div>
      </div>
      <footer><Footer/></footer>
    </div>
  );
};

export default page;
