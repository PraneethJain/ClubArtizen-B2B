"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./NavbarAccesible.css";
import SearchIcon from "@mui/icons-material/Search";
import imgval from "@/public/ca-logo.webp";

const Navbar = () => {
    const router = useRouter();
    const [val, setVal] = useState(localStorage.getItem("search") ?? "");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVal(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = () => {
        localStorage.setItem("search", val);
        window.location.href = `/catalog/accesible`;
    };


    return (
        <div className="NavbarMain">
            <div className="CAlogo">
                <img src={imgval.src} alt="logo" className="logoimg"></img>
            </div>
            <div className="searchform">
                <input
                    type="text"
                    className="searchbar"
                    value={val}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                ></input>
            </div>
            <div className="MyCart" onClick={() => router.push("/cart")}>
            </div>
        </div>
    );
};

export default Navbar;