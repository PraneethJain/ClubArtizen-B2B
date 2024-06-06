"use client";

import React, {
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";
import Link from "next/link";
import Image from "next/image";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo_img from "@/public/ca-logo.webp";

interface NavbarProps {
  searchValue?: string;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ searchValue, setSearchValue }) => {
  // local navbar search value. Update the one passed from the parent when enter or search icon is pressed
  const [localValue, setLocalValue] = useState(searchValue ?? "");

  // update the local navbar search value. Doesn't reflect in the parent
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value ?? "";
    setLocalValue(value);
  };

  // update the parent
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && setSearchValue !== undefined) {
      setSearchValue(localValue);
    }
  };

  const handleClick = () => {
    if (setSearchValue !== undefined) {
      setSearchValue(localValue);
    }
  }
    ;
  return (
    <div className="NavbarMain">
      <div className="TopBar"></div>
      <div className="MidBar"></div>
      <div className="LowBar"></div>
      <div className="Jaalidiv"></div>
      <div className="NavCont">
        <div className="CAlogo">
          <Link href={{ pathname: "/home" }}>
            <Image
              src={logo_img}
              alt="logo"
              className="logoimg"
              width="90"
            ></Image>
          </Link>
        </div>
        {searchValue !== undefined && <div className="searchform">
          <input
            type="text"
            className="searchbar"
            value={localValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          ></input>
          <div className="icon_search" onClick={handleClick}>
            <Link href={{ pathname: "/catalog" }}>
              <SearchIcon />
            </Link>
          </div>
        </div>}
        <Link href="/cart" className="MyCart">
          <ShoppingCartIcon />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
