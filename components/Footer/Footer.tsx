import React from "react";
import Image from "next/image";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

import logo_img from "@/public/ca-logo.webp";

import "./Footer.css";

const Navbar = () => {
  return (
    <div className="FooterMain">
      <div className="TopBarFoot"></div>
      <div className="MidBarFoot"></div>
      <div className="LowBarFoot"></div>
      <div className="JaaliDivFoot"></div>
      <div className="LogoContBody">
        <div className="LogoCont">
          <div className="CALogoFoot">
            <Image
              src={logo_img}
              alt="logo"
              className="logoimg"
              width="90"
            ></Image>
          </div>
          <div className="LogoItem" id="logo-ig">
            <a href="https://www.instagram.com/clubartizen/">
              <InstagramIcon />
            </a>
          </div>
          <div className="LogoItem" id="logo-fb">
            <a href="https://www.facebook.com/clubartizen">
              <FacebookIcon />
            </a>
          </div>
          <div className="LogoItem" id="logo-yt">
            <a href="https://www.youtube.com/@clubartizen">
              <YouTubeIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
