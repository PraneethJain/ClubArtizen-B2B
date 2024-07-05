import logo_img from "@/public/ca-logo.webp";
import back_img from "./background.png";
import back_img2 from "./background2.png";
import be from "./be.png"
import amzn from "./amazon.png"
import it from "./indianterrain.webp"
import srm from "./Srmseal.png"
import aic from "./aic.png"
import Image from "next/image";
import Link from "next/link";
import "./style.css";

const HomePage = () => {
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
        <div className="subTitle">
          For the beauty of craft-inspired living
        </div>
        <div className="textTitle">
        Club Artizen is a social enterprise that works with
        artisan clusters and NGOs and helps develop products
        for corporate and bulk gifting. We contribute towards
        design, unit economics and working capital for artisans.
        Club Artizen has products from across Indian states and
        rooted in different traditional Indian crafts with a modern
        aesthetic, plastic free packaging and a story behind every product.
        Please review our product offerings to move to a sustainable way of gifting.
        </div>
        <Link
          href="/catalog"
          className="mt-12 text-xl text-black z-10 bg-slate-300 p-4 rounded-[1.5rem] bg-opacity-70 border-2 border-gray-900"
        >
          View Product Catalogue
        </Link>
        <div className="workedWith">
          Our Clients:
          <div className="Companies">
            <Image src={it} className="logoCompIT" alt="it" />
            <Image src={aic} className="logoCompAIC" alt="aic" />
            <Image src={amzn} className="logoCompAZ" alt="amazon" />
            <Image src={be} className="logoCompBE" alt="be" />
            <Image src={srm} className="logoCompSRM" alt="srm" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
