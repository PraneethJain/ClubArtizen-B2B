"use server";
import nodemailer from "nodemailer";
import crypto from "crypto";

//refresh access token of CRM
const refreshAccessToken = async () => {
  let access_token = "";
  const url = "https://accounts.zoho.in/oauth/v2/token";
  const formData = new URLSearchParams();
  formData.append("client_id", process.env["client_id"]!);
  formData.append("client_secret", process.env["client_secret"]!);
  formData.append("refresh_token", process.env["refresh_token"]!);
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
      console.error(`HTTP error while fetching item list: ${response.status}`);
    }
  } catch (error) {
    console.error(`Network error: ${error}`);
  }

  return access_token;
};

//fetch products on catalog page
const getProductsData = async () => {
  const access_token = await refreshAccessToken();

  let data: {
    id: string;
    Unit_Price: number;
    Qty_in_Stock: number;
    Product_Name: string;
    Image: string;
    Description: string;
    tags: string[];
    Customizations_Available: string[];
    Customization_Comments: string;
    Customization_Chosen: string;
    GST: number;
    Product_Story_Title: string;
    Product_Story: string;
  }[] = [];
  const url1 =
    "https://www.zohoapis.in/crm/v6/Products?fields=id%2CProduct_Name%2CUnit_Price%2CImage%2CDescription%2CCustomizations_Available%2CTax%2CTag%2CProduct_Story_Title%2CProduct_Story";
  const url2 =
    "https://www.zohoapis.in/crm/v6/Products?fields=id%2CProduct_Name%2CUnit_Price%2CImage%2CDescription%2CCustomizations_Available%2CTax%2CTag%2CProduct_Story_Title%2CProduct_Story&page=2";

  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  try {
    const response1 = await fetch(url1, {
      headers,
      next: { revalidate: 24 * 60 * 60 },
    });

    const response2 = await fetch(url2, {
      headers,
      next: { revalidate: 24 * 60 * 60 },
    });

    if (response1.ok && response2.ok) {
      const response1_json = await response1.json();
      const response2_json = await response2.json();
      const products_data = [...response1_json["data"], ...response2_json["data"]];
      for (let info of products_data) {
        if (info["Image"] === null) {
          info["Image"] = "https://picsum.photos/300";
        }
        if (info["Customizations_Available"] === null) {
          info["Customizations_Available"] = [];
        }
        info["Customization_Comments"] = "None"
        info["Customization_Chosen"] = ""
        info["tags"] = info["Tag"].map(({ name }: { name: string }) => name);

        info["GST"] = 18.0;
        for (let taxrate of info["Tax"]) {
          info["GST"] = parseFloat(taxrate.value.match(/\d{1,2}\.\d{1,2}/)[0]);
        }

        if (info["Product_Story_Title"] === null) {
          info["Product_Story_Title"] = "No Story Found";
        }

        if (info["Product_Story"] === null) {
          info["Product_Story"] = "";
        }

        data.push(info);
      }
    } else {
      console.error(`HTTP error while fetching item list: ${response1.status} and ${response2.status}`);
    }
  } catch (error) {
    console.error(`Network error: ${error}`);
  }
  return data;
};

//type interface for response of information form on enquiry page
interface FormData {
  name: string;
  email: string;
  phone: string;
  additionalRequests: string;
  purpose: string;
  budget: string;
  expectedDelivery: string;
  // remarks: string;
}

//type interface for json post request
interface RequestData {
  data: {
    id: string;
    Customizations: {
      Parent_Id: { name: string; id: string };
      Product: { name: string; id: string };
      Quantity: number;
      Comments: string;
      Customizations_Selected: string;
    }[];
  }[];
}

//function to send products in cart to a deal already created
const sendProducts = async (requestData2: RequestData) => {
  const access_token = await refreshAccessToken();
  const url = `https://www.zohoapis.in/crm/v6/Deals`;
  const headers = {
    Authorization: `Zoho-oauthtoken ${access_token}`,
  };

  var result_prod;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(requestData2),
    });
    console.log("sending products");
    if (response.ok) {
      console.log("ok");
    } else {
      console.error(`HTTP error: ${response.status}`);
    }
    result_prod = response.status;
  } catch (error) {
    console.error(`Network error: ${error}`);
  }
  console.log("done");
  return result_prod;
};

//function to create a deal in CRM
const makePost = async (
  formData: FormData,
  products: {
    product_id: string;
    product_name: string;
    quantity_selected: number;
    customizations: string;
    Customization_Chosen: string;
  }[],
  userid: string,
  total_amount: number
) => {
  const access_token = await refreshAccessToken();

  if (products.length == 0) {
    return -1;
  }

  const requestData = {
    data: [
      {
        Owner: {
          id: "654681000000305001",
        },
        Account_Name: {
          id: userid,
        },
        Pipeline: "654681000000385019",
        Type: "New Business",
        Description:
          "Design your own layouts that align your business processes precisely. Assign them to profiles appropriately.",
        Deal_Name: formData.name,
        Email: formData.email,
        Phone: formData.phone,
        Budget: formData.budget,
        Purpose: formData.purpose,
        Additional_Requests: formData.additionalRequests,
        Amount: total_amount,
        Stage: "Needs Analysis",
        Lead_Source: "Cold Call",
        Closing_Date: formData.expectedDelivery, //YYYY-MM-DD
      },
    ],
  };

  console.log(JSON.stringify(requestData));
  const url = `https://www.zohoapis.in/crm/v6/Deals`;
  const headers = {
    Authorization: `Zoho-oauthtoken ${access_token}`,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(requestData),
    });
    console.log("sending products");
    if (response.ok) {
      const response_json = await response.json();
      const dealID = response_json["data"][0]["details"]["id"];

      const requestData2: RequestData = {
        data: [
          {
            id: dealID,
            Customizations: [],
          },
        ],
      };
      const dealName = formData.name;

      products.forEach((item) => {
        const elem = {
          Parent_Id: {
            name: dealName,
            id: dealID,
          },
          Product: {
            name: item.product_name,
            id: item.product_id,
          },
          Quantity: item.quantity_selected,
          Comments: item.customizations,
          Customizations_Selected: item.Customization_Chosen,
        };
        requestData2["data"][0]["Customizations"].push(elem);
      });
      return await sendProducts(requestData2);
    } else {
      console.error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Network error: ${error}`);
  }
};

//OTP verification
const sendOTP = async (to: string) => {
  const from_email = process.env["smtp_email"];
  const from_password = process.env["smtp_password"];

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: from_email,
      pass: from_password,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  const OTP = crypto.randomInt(100000, 999999);

  try {
    const sendResult = await transport.sendMail({
      from: from_email,
      to,
      subject: "ClubArtizen Login OTP",
      text:
        `Thank you for your interest in Club Artizen and for choosing to purchase gifts that benefit both the community and the environment.\n
Please use the verification code below to sign in.

${OTP}
      
If you didn't request this, you can ignore this email.

Thanks,
Club Artizen`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }

  return OTP;
};

//function for getting all the accounts
const getAccountsData = async (targetMail: string) => {
  const access_token = await refreshAccessToken();
  const url =
    "https://www.zohoapis.in/crm/v6/Accounts?fields=Account_Email,Account_Type";
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  try {
    const response = await fetch(url, {
      headers,
      cache: "no-store",
    });

    if (response.ok) {
      const response_json = await response.json();
      const account_arr = response_json["data"];

      console.log(targetMail);
      const foundAccount = account_arr.find(
        (item: { Account_Type: string; id: string; Account_Email: string }) =>
          item["Account_Email"] === targetMail
      );
      if (foundAccount) {
        console.log(foundAccount["id"]);
        return foundAccount["id"];
      } else {
        return null;
      }
    } else {
      console.error(`HTTP error while fetching item list: ${response.status}`);
    }
  } catch (error) {
    console.error(`Network error: ${error}`);
  }
};

//interface for account form
interface AccountFormData {
  Account_Name: string;
  Account_Email: string;
  Phone: string;
  Description: string;
  Website: string;
  Company: string;
  Shipping_City: string;
  Shipping_Country: string;
  Shipping_Code: string;
  Shipping_Street: string;
  Shipping_State: string;
}

// makes a new account on CRM
const makeNewAccount = async (formData: AccountFormData, custEmail: string) => {
  const access_token = await refreshAccessToken();
  const url = "https://www.zohoapis.in/crm/v6/Accounts";
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const requestData = {
    data: [
      {
        Owner: {
          id: "654681000000305001", // account id of anita
        },
        Ownership: "Private",
        Account_Name: formData.Account_Name,
        Account_Email: custEmail,
        Phone: formData.Phone,
        Description: formData.Description,
        Account_Type: "Customer",
        Website: formData.Website,
        Company: formData.Company,
        Shipping_City: formData.Shipping_City,
        Shipping_Country: formData.Shipping_Country,
        Shipping_Code: formData.Shipping_Code,
        Shipping_Street: formData.Shipping_Street,
        Shipping_State: formData.Shipping_State,
      },
    ],
  };

  console.log(JSON.stringify(requestData));
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(requestData),
    });
    console.log("creating account");
    if (response.ok) {
      const response_json = await response.json();
      const accountID = response_json["data"][0]["details"]["id"];
      return accountID;
    } else {
      console.error(`HTTP error: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Network error: ${error}`);
    return null;
  }
  console.log("done");
};

export {
  refreshAccessToken,
  getProductsData,
  makePost,
  sendOTP,
  getAccountsData,
  makeNewAccount,
};
