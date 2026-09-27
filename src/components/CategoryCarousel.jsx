import { useRef } from "react";
import red from "../assets/redshoe.svg";
import lace from "../assets/orangelace.svg";
import blue from "../assets/blueshoe.svg";
import brown from "../assets/brownshoe.svg";
import black from "../assets/black.png";
import colored from "../assets/colored.png";
import { Link } from "react-router-dom";

const defaultCategories = [
  { name: "Sneakers", image: red, path: "/man" },
  { name: "Casual", image: lace },
  { name: "Formal", image: blue },
  { name: "Limited Edition", image: brown },
  { name: "Leather", image: black },
  { name: "Leather", image: black },
  { name: "Colored", image: colored },
];

const CategoryCarousel = ({ categories = defaultCategories }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-gray-200 h-40 rounded-2xl px-4 sm:px-12 xl:px-24 py-4">
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex items-center justify-center shadow z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 sm:w-8 sm:h-8"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 h-full overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {categories.map((cat, index) => (
          <Link
            to={cat.path || "#"}
            key={index}
            className="flex-shrink-0 min-w-[160px] sm:min-w-[220px] h-full bg-gray-300/50 rounded-xl flex flex-col items-center justify-center overflow-hidden py-2 px-2"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-auto h-16 sm:h-20 object-contain"
            />
            <p className="font-semibold text-base sm:text-lg flex items-center gap-1 mt-1">
              {cat.name} <span>→</span>
            </p>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex items-center justify-center shadow z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 sm:w-8 sm:h-8"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryCarousel;
