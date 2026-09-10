import first from "../../assets/OIP.svg";
import second from "../../assets/OIP2.svg";
import third from "../../assets/OIP3.svg";
import fourth from "../../assets/OIP4.svg";
import fifth from "../../assets/OIP5.svg";
const bestSellers = [
  { name: "Shoe 1", price: 250, image: first, featured: true },
  { name: "Shoe 2", price: 150, image: second },
  { name: "Shoe 3", price: 280, image: third },
  { name: "Shoe 4", price: 230, image: fourth },
  { name: "Shoe 5", price: 300, image: fifth },
];

const BestSellers = () => {
  return (
    <div className="xl:px-10 px-4 py-10">
      <div className="flex items-center gap-4 mb-6">
        <p className="text-white font-title text-2xl">BEST SELLERS</p>
        <div className="flex-1 h-[2px] bg-white/30" />
      </div>

      <div className="flex gap-4 overflow-x-auto justify-center scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {bestSellers.map((item, i) => (
          <div
            key={i}
            className={`relative flex-shrink-0 w-[220px] h-[150px] bg-[#2b2b2b] rounded-xl flex items-center justify-center ${
              item.featured ? "border-2 border-blue-400" : ""
            }`}
          >
            <span className="absolute top-3 left-3 bg-[#E8A857] text-black text-sm font-semibold px-3 py-1 rounded-full">
              {item.price}$
            </span>
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-40 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
