"use server";

const refreshAccessToken = async () => {
  let access_token = "";
  const url = "https://accounts.zoho.in/oauth/v2/token";
  const formData = new URLSearchParams();
  formData.append("client_id", process.env["client-id"]!);
  formData.append("client_secret", process.env["client-secret"]!);
  formData.append("refresh_token", process.env["refresh-token"]!);
  formData.append("grant_type", "refresh_token");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      next: {
        revalidate: 24 * 60,
      },
    });

    if (response.ok) {
      const data = await response.json();
      access_token = data["access_token"];
    } else {
      //   return NextResponse.json({ error: `HTTP error ${response.status}` });
    }
  } catch (error) {
    // return NextResponse.json({ error: `Network error: ${error.message}` });
  }

  return access_token;
};

const getProductsData = async () => {
  const access_token = await refreshAccessToken();

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

  return data;
};
export { refreshAccessToken, getProductsData };
