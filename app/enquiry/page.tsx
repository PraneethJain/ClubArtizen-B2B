"use client";

import React, { useState, useEffect } from "react";
import Enquirycard from "@/components/Enquirycard/Enquirycard";
import "./style.css";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Identityform from "@/components/Identityform/Identityform";
import { makePost } from "@/app/actions";
import type { Cart } from "../lib";

interface FormData {
  name: string;
  email: string;
  phone: string;
  additionalRequests: string;
  purpose: string;
  budget: string;
  expectedDelivery: string;
}

const EnquiryPage = () => {
  const [receivedData, setReceivedData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    additionalRequests: "",
    purpose: "",
    budget: "",
    expectedDelivery: "",
    // remarks: '',
  });

  const receiveDataFromB = (dataFromB: FormData) => {
    setReceivedData(dataFromB);
  };

  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") ?? "{}"));
  }, []);

  const handleSubmission = async () => {
    const products = Object.values(cart)
      .filter(({ quantity }) => quantity !== 0)
      .map(({ product_id, product_name, quantity, Customization_Comments, Customization_Chosen }) => {
        return { product_id, product_name, quantity_selected: quantity, customizations: Customization_Comments, Customization_Chosen };
      });
    const userid = JSON.parse(localStorage.getItem("accountID") ?? "{}");
    const result = await makePost(receivedData, products, userid, Object.values(cart)
      .map(({ price, quantity }) => price * quantity)
      .reduce((acc, rec) => acc + rec, 0));
    if (result === 200) {
      alert("Deal Created Successfully!");
      localStorage.removeItem("cart");
      location.reload();
    } else if (result === -1) {
      alert("Cart is Empty!");
    } else {
      alert("Error in Deal Creation!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mainFramea">
        <div className="catalogLista">
          <h2> Cart </h2>
          {Object.values(cart)
            .filter(({ quantity }) => quantity !== 0)
            .map(
              ({
                product_id,
                product_name,
                price,
                quantity,
                GST,
                image_src,
                Customizations_Available,
                Customization_Comments,
                Customization_Chosen,
              }) => (
                <Enquirycard
                  key={product_id}
                  product_id={product_id}
                  product_name={product_name}
                  price={price}
                  quantity_selected={quantity}
                  GST={GST}
                  image_url={image_src}
                  Customizations_Available={Customizations_Available}
                  Customization_Comments={Customization_Comments}
                  Customization_Chosen={Customization_Chosen}
                  setCart={setCart}
                />
              )
            )}
        </div>

        <div className="finalForm">
          <div className="totalInfo">
            <div className="textInfo">
              <div>Shipping:</div> <div className="curInfo">At Actuals</div>
            </div>
            <div className="textInfo">
              <div>Total:</div>{" "}
              <div className="curInfo">
                {" "}
                &#8377;
                {Object.values(cart)
                  .map(({ price, quantity }) => price * quantity)
                  .reduce((acc, rec) => acc + rec, 0)}
              </div>
            </div>
          </div>

          <Identityform getData={receiveDataFromB} />
          <button className="checkoutBtn" onClick={handleSubmission}>
            Send Enquiry
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EnquiryPage;
