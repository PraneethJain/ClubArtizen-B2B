"use client";

import React, { useState, ChangeEventHandler } from "react";
import { getAccountsData, makeNewAccount, sendOTP } from "@/app/actions";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import "./style.css";

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

const initialFormData: AccountFormData = {
  Account_Name: "",
  Account_Email: "",
  Phone: "",
  Description: "",
  Website: "",
  Company: "",
  Shipping_City: "",
  Shipping_Country: "",
  Shipping_Code: "",
  Shipping_Street: "",
  Shipping_State: "",
};

const Page = () => {
  const [mail, setMail] = useState("");
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [otp, setOTP] = useState<number | undefined>(undefined);
  const [verified, setVerified] = useState(false);
  const [accid, setAccid] = useState<string | null>("");
  const [formData, setFormData] = useState<AccountFormData>(initialFormData);
  const [realOTP, setRealOTP] = useState<number | undefined>(undefined);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const changeMail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMail(e.target.value);
  };

  const handleVerify = async () => {
    if (mail == "") {
      alert("Please enter Email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      alert("Please enter a valid email address");
      return;
    }
    alert("OTP has been sent");
    setDisplay(true)
    const otpFromServer = await sendOTP(mail);
    setRealOTP(otpFromServer);
  };

  const verifyOTP = async () => {
    console.log(otp);
    console.log(realOTP);
    if (realOTP == undefined) {
      alert("Reend OTP first");
    } else if (otp === realOTP) {
      setVerified(true);
      alert("Valid OTP. Please continue.");
      setDisplay2(true)
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleClick = async (targetMail: string) => {
    try {
      if (targetMail === "") {
        alert("Please enter the account Email");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(targetMail)) {
        alert("Please enter a valid email address");
        return;
      }
      const val = await getAccountsData(targetMail);
      setAccid(val);
      if (val !== null) {
        localStorage.setItem("accountID", JSON.stringify(val));
      }
    } catch (error) {
      console.error("Error fetching accounts data:", error);
    }
  };

  const accountCreation = async () => {
    console.log(formData.Account_Name);
    if (
      formData.Account_Name == "" ||
      formData.Phone == "" ||
      formData.Company == "" ||
      formData.Shipping_City == "" ||
      formData.Shipping_Country == "" ||
      formData.Shipping_Code == "" ||
      formData.Shipping_Street == "" ||
      formData.Shipping_State == ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (formData.Phone !== "" && !phoneRegex.test(formData.Phone)) {
      alert("Please enter a valid phone number");
      return;
    }

    const websiteRegex = /^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/;
    if (formData.Website !== "" && !websiteRegex.test(formData.Website)) {
      alert("Please enter a valid website domain");
      return;
    }

    const cityCodeRegex = /^[0-9]{6}$/;
    if (
      formData.Shipping_Code !== "" &&
      !cityCodeRegex.test(formData.Shipping_Code)
    ) {
      alert("Please enter a valid city code");
      return;
    }

    const resp = await makeNewAccount(formData, mail);
    setAccid(resp);
    if (resp !== null) {
      localStorage.setItem("accountID", JSON.stringify(resp));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="verification">
        <h1> Account Verification </h1>
        <div className="verification-email">
          {accid === "" && <p>Please enter the account Email</p>}
          <input
            type="email"
            value={mail}
            onChange={changeMail}
            required
          ></input>
          <button onClick={handleVerify}>Send OTP</button>
          {display && (
            <div className="verification-otp">
              <input
                type="number"
                value={otp}
                onChange={(e) => setOTP(parseInt(e.target.value))}
              ></input>
              <button onClick={verifyOTP}>Verify OTP</button>
            </div>
          )}
          {display2 && (<button onClick={() => handleClick(mail)}>
            Continue to Verify Account
          </button>)}
        </div>
        {accid === null && verified == true && (
          //form HTML
          <div className="verification-incomplete">
            <p>Account does not exist, please create an account</p>
            <div className="verification-form">
              <div className="verification-form-group">
                <label htmlFor="Account_Name">Account Name</label>
                <input
                  type="email"
                  id="Account_Name"
                  name="Account_Name"
                  value={formData.Account_Name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="verification-form-group">
                <label htmlFor="Phone">POC Phone</label>
                <input
                  type="tel"
                  id="Phone"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="verification-form-group">
                <label htmlFor="Website">Website</label>
                <input
                  type="url"
                  id="Website"
                  name="Website"
                  value={formData.Website}
                  onChange={handleChange}
                />
              </div>
              <div className="verification-form-group">
                <label htmlFor="Company">Company</label>
                <input
                  type="text"
                  id="Company"
                  name="Company"
                  value={formData.Company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="verification-form-group">
                <label htmlFor="Shipping_City">Shipping City</label>
                <input
                  type="text"
                  id="Shipping_City"
                  name="Shipping_City"
                  value={formData.Shipping_City}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="verification-form-group">
                <label htmlFor="Shipping_Country">Shipping Country</label>
                <input
                  type="text"
                  id="Shipping_Country"
                  name="Shipping_Country"
                  value={formData.Shipping_Country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="verification-form-group">
                <label htmlFor="Shipping_State">Shipping State</label>
                <input
                  type="text"
                  id="Shipping_State"
                  name="Shipping_State"
                  value={formData.Shipping_State}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="verification-form-group">
                <label htmlFor="Shipping_Street">Shipping Street</label>
                <input
                  type="text"
                  id="Shipping_Street"
                  name="Shipping_Street"
                  value={formData.Shipping_Street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="verification-form-group">
                <label htmlFor="Shipping_Code">Shipping Code</label>
                <input
                  type="text"
                  id="Shipping_Code"
                  name="Shipping_Code"
                  value={formData.Shipping_Code}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="buttonFinal" onClick={accountCreation}>
                Submit
              </button>
            </div>
          </div>
        )}
        {accid !== null && accid !== "" &&
          (
            <div>
              {/* <div>{accid}</div> */}
              <p>Account exists, you may proceed</p>
              <Link href={{ pathname: "/enquiry" }}>Proceed</Link>
            </div>
          )
        }
      </div>
      <Footer />
    </div>
  );
};

export default Page;
