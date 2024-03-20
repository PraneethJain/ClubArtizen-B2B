import React from "react";
import Image from "next/image";
import Information from "@/components/ProductInformation/ProductInformation";
import "./style.css";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Product",
};

interface SearchParams {
  searchParams: {
    product_id: string;
    title: string;
    price: string;
    image_src: string;
    description: string;
    tags_str: string;
    GST: string;
    product_story: string;
    product_story_title: string;
  }
}

const ProductPage = async ({ searchParams }: SearchParams) => {
  const { product_id, title, GST, price, image_src, description, tags_str, product_story, product_story_title } = searchParams;
  const rate = parseInt(price);
  const tags = JSON.parse(tags_str);
  const gst = parseFloat(GST);

  return (
    <div>
      <Navbar />
      <div className="mainbod">
        <Image
          sizes="100vw"
          style={{
            width: 'auto',
            height: '100%',
            flex: 1,
          }}
          width={500}
          height={300}
          src={image_src} alt={title} className="Image" />
        <Information
          product_name={title}
          price={rate}
          story={product_story}
          dimensions={""}
          story_title={product_story_title}
          tags={tags}
          description={description}          
          GST={gst}                           
          product_id={product_id}
          image_src={image_src}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
