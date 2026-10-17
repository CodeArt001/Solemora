import { Link } from "react-router-dom";

import kidsHero from "../assets/kidsImage.jpg";
import image1 from "../assets/round1.svg";
import image2 from "../assets/round2.svg";
import image3 from "../assets/round3.svg";
import image4 from "../assets/round4.svg";
import StarRating from "../components/StarRating";
import KidsBestSellers from "./Kidsbestsellers";

const customerAvatars = [image1, image2, image3, image4];

const KidsHero = () => {
  return (
    <div>
      <div
        className="relative bg-no-repeat bg-cover bg-center min-h-[460px] sm:min-h-[560px] flex items-center"
        style={{ backgroundImage: `url(${kidsHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />

        <div className="relative z-10 xl:px-16 px-4 py-10 max-w-xl">
          <p className="font-body text-xs font-semibold tracking-[0.25em] text-[#D6A36A] mb-3">
            KIDS COLLECTION
          </p>

          <p className="font-title text-white font-bold text-5xl sm:text-6xl leading-[1.05]">
            SMALL STEPS.
            <br />
            BIG
          </p>
          <p className="font-script italic text-[#D6A36A] text-6xl sm:text-7xl -mt-1">
            style.
          </p>

          <p className="text-white/90 font-body text-base sm:text-lg mt-5 max-w-sm">
            Lightweight, durable favorites made for every adventure.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-7">
            <Link
              to="/products/1"
              className="flex items-center gap-2 bg-[#D6A36A] rounded-full px-8 py-3 font-semibold text-black transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              SHOP NOW
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("best-sellers")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="border-2 border-white rounded-full px-8 py-3 font-semibold text-white transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              EXPLORE
            </button>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <span className="-space-x-2 inline-flex">
              {customerAvatars.map((avatarSource, index) => (
                <img
                  key={index}
                  src={avatarSource}
                  alt=""
                  className="bg-[#D6A36A] rounded-full w-6 h-6 border-2 border-black/40"
                />
              ))}
            </span>
            <div>
              <p className="text-white font-body text-sm">
                50K+ Happy Customers
              </p>
              <StarRating />
            </div>
          </div>
        </div>
      </div>
      <KidsBestSellers />
    </div>
  );
};

export default KidsHero;
