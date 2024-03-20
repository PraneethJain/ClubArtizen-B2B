"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CatalogCard from "@/components/Catalogcard/CatalogCard";
import "./style.css";
import { getProductsData } from "@/app/actions";

export default function Catalog() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<
    {
      id: string;
      Unit_Price: number;
      Qty_in_Stock: number;
      Product_Name: string;
      Image: string;
    }[]
  >([]);

  useEffect(() => {
    getProductsData().then((res) => setProducts(res));
  }, []);

  return (
    <main>
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="mainFrame max-h-[77vh]">
        <div className="catalogList">
          {products
            .filter(({ Product_Name }) => {
              return Product_Name.includes(searchValue);
            })
            .map(({ id, Unit_Price, Qty_in_Stock, Product_Name, Image }) => {
              return (
                <CatalogCard
                  key={id}
                  product_id={id}
                  title={Product_Name}
                  price={Unit_Price}
                  image_src={Image}
                  max_quantity={Qty_in_Stock}
                />
              );
            })}
        </div>
      </div>
      <Footer />
    </main>
  );
}
