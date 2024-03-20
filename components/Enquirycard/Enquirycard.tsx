"use client";

import React, { useState, ChangeEventHandler } from "react";
import Image from "next/image";
import type { Cart } from "@/app/lib";
import "./Enquirycard.css";

interface EnquirycardProps {
    product_id: string;
    product_name: string;
    price: number;
    GST: number;
    quantity_selected: number;
    image_url: string;
    Customizations_Available: string[];
    Customization_Comments: string;
    Customization_Chosen: string;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
}


const Enquirycard: React.FC<EnquirycardProps> = ({
    product_id,
    product_name,
    price,
    quantity_selected,
    image_url,
    Customizations_Available,
    Customization_Comments,
    Customization_Chosen,
    setCart,
}) => {
    // const [customizations, setCustomizations] = useState<string[]>(Array(Customizations_Available?.length).fill(""));
    const [dict, setDict] = useState("")
    const [selectedOption, setSelectedOption] = useState("")

    const handleCustomizationChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setDict(e.target.value)
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            if (updatedCart.hasOwnProperty(product_id)) {
                updatedCart[product_id]["Customization_Comments"] = e.target.value;
            }
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const changeOption: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setSelectedOption(e.target.value)
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            if (updatedCart.hasOwnProperty(product_id)) {
                updatedCart[product_id]["Customization_Chosen"] = e.target.value;
            }
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    }

    return (
        <div className="ProductCard">
            <div className="ProductImage">
                <Image
                    src={image_url}
                    alt={product_name}
                    className="productImage"
                    height="100"
                    width="100"
                    sizes="100vw"
                ></Image>
            </div>
            <div className="ProductInfo">
                <h3 className="ProductTitle">{product_name}</h3>
                <div className="ProductMoreInfo">
                    <div className="ProductCustomisations">
                        <label htmlFor="extraComments">Comments</label>
                        <input type="text" className="extraComments" value={dict} onChange={handleCustomizationChange}></input>
                        {(Customizations_Available && Customizations_Available.length > 0) &&
                            <>
                                <label htmlFor="ProductCustomisationDropDown">Customisations</label>
                                <select className="ProductCustomisationDropDown" value={selectedOption} onChange={changeOption}>
                                    <option>None</option>
                                    {Customizations_Available.map((customization, index) => (
                                        <option key={customization}>{customization}</option>
                                    ))}
                                </select>
                            </>
                        }
                    </div>
                    <div className="StockPriceInfo">
                        <span>Quantity</span>
                        <span>{quantity_selected}</span>
                        <span>Price</span>
                        <span>&#8377;{price || 0}</span>
                        <span className="ProductTotalPrice">Total Price</span>
                        <span className="ProductTotalPrice">&#8377;{price * quantity_selected}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enquirycard;
