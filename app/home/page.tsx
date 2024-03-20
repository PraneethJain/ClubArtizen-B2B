import logo_img from "@/public/ca-logo.webp";
import back_img from "./background.png";
import back_img2 from "./background2.png";
import Image from "next/image";
import Link from "next/link";
import "./style.css";

const Homepage = () => {
  return (
    <div>
      <div className="translucentBackdrop"></div>
      <div className="mainFrame">
        <Image
          src={back_img}
          className="backgroundImage"
          alt="background"
          width="1200"
        />
        <Image
          src={back_img2}
          className="backgroundImage2"
          alt="background"
          width="650"
        />
        <Image src={logo_img} className="mainLogo" alt="logo" />
        <div className="mainTitle">CLUB ARTIZEN</div>
        <div className="subTitle">for the beauty of craft inspired living</div>
        <Link
          href="/catalog"
          className="mt-8 text-xl text-black z-10 bg-slate-300 p-4 rounded bg-opacity-70"
        >
          View Product Catalogue
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
