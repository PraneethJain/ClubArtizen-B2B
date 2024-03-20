import React from "react";
import "./ProductInformation.css";
import Stockval from "@/components/Stockval/Stockval";

interface InformationProps {
  product_name: string;
  price: number;
  GST: number;
  description: string;
  story: string;
  story_title: string;
  tags: string[];
  dimensions: string;
  product_id: string;
  image_src: string;
}

const Information: React.FC<InformationProps> = ({
  product_name,
  price,
  GST,
  description,
  story,
  story_title,
  tags,
  dimensions,
  product_id,
  image_src,
}) => {
  return (
    <div className="mainframe">
      <div className="maintitle">{product_name}</div>
      <div className="Categories">
        {tags.map((catv) => (
          <div className="catvalitem" key={catv}>
            {catv}
          </div>
        ))}
      </div>
      <div className="infomenu">
        <Stockval product_story={story} product_story_title={story_title} GST={GST} product_id={product_id} product_name={product_name} price={price} image_src={image_src} description={description} tags={tags} />

        <div className="PriceMenu">
          <div className="priceval">
            <div className="pricetext">Price: </div>
            <div className="priceitem">&#8377;{price - GST * price / 100}</div>
          </div>
          <div className="sampletext">per piece excluding GST and shipping</div>
          <div className="priceval">
            <div className="pricetext">GST: </div>
            <div className="priceitem">&#8377;{GST * price / 100}</div>
          </div>
          <div className="priceval">
            <div className="pricetext">Total: </div>
            <div className="priceitem">
              &#8377;
              {price}
            </div>
          </div>
        </div>
      </div>
      <div className="descriptionBod">{description}</div>
      <div className="StoryCont">
        <div className="storytitle">{story_title}</div>
        <div className="story">{story}</div>
      </div>
    </div>
  );
};

export default Information;
