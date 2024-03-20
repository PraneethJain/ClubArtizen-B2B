import React, {useState} from "react";
import CatalogCardAccesible from "@/components/CatalogCardAccesible/CatalogCardAccesible";
import "./style.css";
import { refreshAccessToken } from "@/app/actions";
import NavbarAccesible from "@/components/NavbarAccesible/NavbarAccesible";

export default async function Catalog() {
  const access_token = await refreshAccessToken();
  console.log(access_token);

  let data: {
    id: string;
    Unit_Price: number;
    Qty_in_Stock: number;
    Product_Name: string;
    Image: string;
  }[] = [];
  const url =
    "https://www.zohoapis.in/crm/v6/Products?fields=id%2CProduct_Name%2CUnit_Price%2CQty_in_Stock%2CImage";
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 24 * 60 * 60 },
    });

    if (response.ok) {
      const response_json = await response.json();
      for (let info of response_json["data"]) {
        if (info["Image"] === null) {
          info["Image"] = "https://picsum.photos/300";
        } else {
        }
        data.push(info);
      }
    } else {
      // return NextResponse.json({ error: `HTTP error ${response.status}` });
    }
  } catch (error) {
    // return NextResponse.json({ error: `Network error: ${error.message}` });
  }

  return (
    <main>
      <NavbarAccesible/>
      <div className="mainFrame">
        <div className="catalogList">
          {data.map(({ id, Unit_Price, Qty_in_Stock, Product_Name, Image }) => {
            return (
              <CatalogCardAccesible
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
    </main>
  );
}
