import { useState } from "react";
import { Link } from "react-router-dom";

// Swap these for your real product photos
import best1 from "../assets/best1.avif";
import best2 from "../assets/best.avif";
import best3 from "../assets/best3.webp";
import best4 from "../assets/best4.avif";

const defaultProducts = [
  {
    id: 1,
    name: "Apex Runner",
    price: 190,
    collection: "Signature collection",
    image: best1,
  },
  {
    id: 2,
    name: "City Court",
    price: 220,
    collection: "Signature collection",
    image: best2,
  },
  {
    id: 3,
    name: "Trail One",
    price: 175,
    collection: "Signature collection",
    image: best3,
  },
  {
    id: 4,
    name: "Mono High",
    price: 240,
    collection: "Signature collection",
    image: best4,
  },
];

const CuratedBestSellers = ({
  products = defaultProducts,
  viewAllPath = "/products",
}) => {
  const [liked, setLiked] = useState([]);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-[#F5F1EA] xl:px-16 px-4 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-[#D6A36A] mb-4">
            CURATED FOR YOU
          </p>
          <h2 className="font-serif text-4xl xl:text-5xl text-[#111]">
            BEST SELLERS
          </h2>
        </div>

        <Link
          to={viewAllPath}
          className="flex items-center gap-2 text-[#111] pb-2"
        >
          View all
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {products.map((item) => {
          const isLiked = liked.includes(item.id);
          return (
            <div key={item.id} className="relative">
              <Link
                to={`/products/${item.id}`}
                state={{ product: item }}
                className="block"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-[6/5] object-cover"
                />
                <div className="bg-[#EBE7E1] px-4 py-4">
                  <div className="flex items-center justify-between">
                    <p className="font-body text-lg text-[#111]">{item.name}</p>
                    <p className="font-body font-bold text-[#111]">
                      ${item.price}
                    </p>
                  </div>
                  <p className="font-body text-sm text-neutral-500 mt-2">
                    {item.collection}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                aria-label={
                  isLiked ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-pressed={isLiked}
                onClick={() => toggleLike(item.id)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isLiked ? "#D6A36A" : "none"}
                  stroke={isLiked ? "#D6A36A" : "currentColor"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-[#111]"
                >
                  <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CuratedBestSellers;
