import Link from "next/link";
import React from "react";
import Slider from "@/components/Slider/Slider";
import Information from "@/components/ProductInformation/ProductInformation";
import { jsonData } from "./jsonDataval";
import "./style.css";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const page = () => {
  const images = [
    "https://picsum.photos/200",
    "https://picsum.photos/300",
    "https://picsum.photos/400",
    "https://picsum.photos/500",
    "https://picsum.photos/100",
    "https://picsum.photos/400",
    "https://picsum.photos/500",
  ];
  return (
    <div>
      <nav><Navbar/></nav>
      <div className="mainbod">
        <Slider images={images} />
        <Information
          product_name={jsonData["product_name"]}
          price={jsonData["price"]}
          GST={jsonData["GST"]}
          shipping={jsonData["shipping"]}
          stock={jsonData["stock"]}
          description={jsonData["description"]}
          story={jsonData["story"]}
          story_title={jsonData["story_title"]}
          story_link={jsonData["story_link"]}
          categories={jsonData["categories"]}
          color={jsonData["color"]}
          material={jsonData["material"]}
          dimensions={jsonData["dimensions"]}
          state={jsonData["state"]}
          made_by={jsonData["made_by"]}
          care_instructions={jsonData["care_instructions"]}
          note={jsonData["note"]}
        />
      </div>
      <footer><Footer/></footer>
    </div>
  );
};

export default page;
