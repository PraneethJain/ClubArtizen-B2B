import React from "react";
import "./Footer.css";
import Image from "next/image";
import { Instagram, Facebook, YouTube } from "@mui/icons-material";
import logo_img from "@/public/ca-logo.webp";
const Navbar = () => {
  return (
    <div className="FooterMain">
      <div className="TopBarFoot"></div>
      <div className="MidBarFoot"></div>
      <div className="LowBarFoot"></div>
      <div className="JaalidivFoot"></div>
      <div className="logo_cont_bod">
        <div className="logo_cont">
          <div className="CAlogofoot">
            <Image
              src={logo_img}
              alt="logo"
              className="logoimg"
              width="90"
            ></Image>
          </div>
          <div className="logoitem" id="val1">
            <a href="https://www.instagram.com/clubartizen/">
              <Instagram className="logos" />
            </a>
          </div>
          <div className="logoitem" id="val2">
            <a href="https://www.facebook.com/clubartizen">
              <Facebook className="logos" />
            </a>
          </div>
          <div className="logoitem" id="val3">
            <a href="https://www.youtube.com/@clubartizen">
              <YouTube className="logos" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
