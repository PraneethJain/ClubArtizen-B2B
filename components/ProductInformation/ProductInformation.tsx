import React from "react";
import "./ProductInformation.css";
import Stockval from "@/components/Stockval/Stockval";

interface InformationProps {
  product_name: string;
  price: number;
  GST: number;
  shipping: number;
  stock: number;
  description: string;
  story: string;
  story_title: string;
  story_link: string;
  categories: string[];
  color: string;
  material: string;
  dimensions: string;
  state: string;
  made_by: string;
  care_instructions: string;
  note: string;
}

const Information: React.FC<InformationProps> = ({
  product_name,
  price,
  GST,
  shipping,
  stock,
  description,
  story,
  story_title,
  story_link,
  categories,
  color,
  material,
  dimensions,
  state,
  made_by,
  care_instructions,
  note,
}) => {
  return (
    <div className="mainframe">
      <div className="maintitle">{product_name}</div>
      <div className="Categories">
        {categories.map((catv) => (
          <div className="catvalitem" key={catv}>
            {catv}
          </div>
        ))}
      </div>
      <div className="infomenu">
        <Stockval stock={stock} />

        <div className="PriceMenu">
          <div className="priceval">
            <div className="pricetext">Price: </div>
            <div className="priceitem">&#8377;{price}</div>
          </div>
          <div className="sampletext">per piece excluding GST and shipping</div>
          <div className="priceval">
            <div className="pricetext">GST: </div>
            <div className="priceitem">&#8377;{GST}</div>
          </div>
          <div className="priceval">
            <div className="pricetext" id="shipping">
              Shipping:
            </div>{" "}
            <div className="priceitem">&#8377;{shipping}</div>
          </div>
          <div className="priceval">
            <div className="pricetext">Total: </div>
            <div className="priceitem">
              &#8377;
              {price + GST + shipping}
            </div>
          </div>
        </div>
      </div>
      <div className="descriptionBod">{description}</div>
      <div className="StoryCont">
        <div className="storytitle">{story_title}</div>
        <div className="story">{story}</div>
        {story_link && (
          <div className="storylink">
            <a href={story_link}>Read More</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Information;
