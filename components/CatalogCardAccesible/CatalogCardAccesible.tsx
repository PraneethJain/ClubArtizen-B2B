"use client";

import React, { useState, useEffect } from "react";
import cartval from "./cart.webp";
import "./CatalogCardAccesible.css";
import Image from "next/image";

interface CardsProps {
    product_id: string;
    title: string;
    price: number;
    image_src: string;
    max_quantity: number;
}

const CatalogCard: React.FC<CardsProps> = ({
    product_id,
    title,
    price,
    image_src,
    max_quantity,
}) => {
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleCartImageClick = () => {
        const existingCart = localStorage.getItem("cart");

        let cartData;
        if (!existingCart) {
            cartData = {};
        } else {
            cartData = JSON.parse(existingCart);
        }

        if (cartData.hasOwnProperty(product_id)) {
            cartData[product_id]["quantity"] += quantity;
        } else {
            const test_object = {
                product_name: title,
                price: price,
                quantity: quantity,
                GST: 10,
                shipping: 10,
            };
            cartData[product_id] = test_object;
        }

        localStorage.setItem("cart", JSON.stringify(cartData));
    };

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const shouldRenderCard = title.includes(
            localStorage.getItem("search") ?? ""
        );
        setIsVisible(shouldRenderCard);
    }, [title]);

    return isVisible ? (
        <div className="imageContainer">
            <Image
                src={image_src}
                className="productImage"
                height="0"
                width="0"
                sizes="100vw"
                alt={title}
            ></Image>
            <div className="textContainer">{title}</div>
            <div className="backdropFilter">
                <div className="lowerInfo">
                    <div className="priceContainer">
                        Price: &nbsp; &nbsp; &nbsp;&nbsp; &#8377;{price}
                    </div>
                    <div className="cartContainer">
                        <div className="qtyBar">
                            <span className="qtyText">Quantity: &nbsp;</span>
                            <input
                                className="inNum"
                                type="number"
                                min="1"
                                // max={max_quantity}
                                value={quantity.toString()}
                                onChange={handleQuantityChange}
                            />
                        </div>
                        <div className="cartImage" onClick={handleCartImageClick}>Add to Cart</div>
                    </div>
                </div>
                <div className="moreText">More Information</div>
            </div>
        </div>
    ) : null;
};

export default CatalogCard;
