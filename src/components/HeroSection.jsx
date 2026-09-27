import { Link } from "react-router-dom";
import image from "../assets/round1.svg";
import image2 from "../assets/round2.svg";
import image3 from "../assets/round3.svg";
import image4 from "../assets/round4.svg";
import StarRating from "./StarRating";
const HeroSection = () => {
  return (
    <div className="xl:px-10 px-4 pt-8">
      <div className="xl:relative py-4 text-center xl:text-left">
        <p className="font-title text-white font-bold xl:text-7xl text-5xl">
          WALK YOUR
        </p>
        <p className="font-script text-8xl italic text-[#D6A36A] xl:absolute xl:left-[1%] xl:-bottom-16">
          Style
        </p>
      </div>
      <p className="text-white xl:mt-22 max-w-[400px] font-body text-[1.1rem] tracking-wider xl:font-normal font-bold">
        Premium quality. Timeless comfort. <br />
        Crafted for those who never settle.
      </p>
      <div className=" flex flex-col xl:flex-row gap-6 text-white py-5">
        <Link to="/products/:id">
          <button className="bg-[#D6A36A] rounded-3xl px-10 py-2 w-full">
            SHOP NOW
          </button>
        </Link>
        <button className="border-white border-3 rounded-3xl px-10 py-2">
          EXPLORE
        </button>
      </div>
      <div className="flex gap-4 mt-1">
        <span className="-space-x-2 inline-flex">
          <img
            src={image}
            alt=""
            className="bg-[#D6A36A] rounded-full w-6 h-6"
          />
          <img
            src={image2}
            alt=""
            className="bg-[#D6A36A] rounded-full w-6 h-6"
          />
          <img
            src={image3}
            alt=""
            className="bg-[#D6A36A] rounded-full w-6 h-6"
          />
          <img
            src={image4}
            alt=""
            className="bg-[#D6A36A] rounded-full w-6 h-6"
          />
        </span>
        <div className="">
          <p className="text-white font-body">50k+ Happy Customers</p>
          <StarRating />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
