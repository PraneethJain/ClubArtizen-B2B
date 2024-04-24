"use client";

import React, { useState, useEffect, ChangeEventHandler } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/ProductCard/ProductCard";
import "./style.css";
import type { Cart } from "@/app/lib";
import { getProductsData } from "@/app/actions";

export default function CatalogPage() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<
    {
      id: string;
      Unit_Price: number;
      Product_Name: string;
      Image: string;
      Description: string;
      tags: string[];
      GST: number;
      Customizations_Available: string[];
      Customization_Comments: string;
      Customization_Chosen: string;
      Product_Story_Title: string;
      Product_Story: string;
    }[]
  >([]);

  const [cart, setCart] = useState<Cart>({});
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") ?? "{}"));
  }, []);

  useEffect(() => {
    getProductsData().then((res) => {
      setProducts(res)
      let tags = new Set<string>;
      for (const product of res) {
        for (const tag of product.tags) {
          tags.add(tag);
        }
      }
      setAllTags(Array.from(tags));
    });
  }, []);

  const handleTagChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    console.log(e.target.value);
    setSelectedTag(e.target.value);
  }


  return (
    <main>
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="mainFrame max-h-[77vh] flex flex-col">
        <div className="flex flex-row items-center">
          <label className="text-black m-4" htmlFor="search-select">Tags</label>
          <select name="selectedTag" onChange={e => handleTagChange(e)} className="search-select">
            <option value={"all"}>all</option>
            {
              allTags.map((tag) => {
                return <option value={tag} key={tag}>{tag}</option>
              })
            }
          </select>
        </div>
        <div className="catalogList">
          {products
            .filter(({ Product_Name, tags }) => {
              if (selectedTag !== "all" && !tags.includes(selectedTag)) {
                return false;
              }

              const productName = Product_Name.toLowerCase();
              const searchWords = searchValue.toLowerCase().split(/\s+/);
              for (const searchWord of searchWords) {
                if (!productName.includes(searchWord)) {
                  return false;
                }
              }

              if (productName.includes("sample")) {
                return false;
              }

              return true;
            })
            .map(({ id, Product_Story, Product_Story_Title, Description, Unit_Price, Product_Name, Image, tags, Customizations_Available, GST, Customization_Comments, Customization_Chosen }) => {
              return (
                <ProductCard
                  key={id}
                  product_id={id}
                  title={Product_Name}
                  price={Unit_Price}
                  image_src={Image}
                  description={Description}
                  setCart={setCart}
                  tags={tags}
                  product_story={Product_Story}
                  product_story_title={Product_Story_Title}
                  Customizations_Available={Customizations_Available}
                  Customization_Comments={Customization_Comments}
                  Customization_Chosen={Customization_Chosen}
                  quantity_selected={cart[id] ? cart[id]["quantity"] : 0}
                  GST={GST}
                />
              );
            })}
        </div>
      </div>
      <Footer />
    </main>
  );
}
