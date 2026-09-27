import navBG from "../assets/image.svg";
// import CategoryHero from "./Features/CategoryHero";
import CategoryCarousel from "../components/CategoryCarousel";
import ProductGrid from "../components/ProductGrid";

// Swap these for real product images from your assets folder
import first from "../assets/OIP.svg";
import second from "../assets/OIP2.svg";
import third from "../assets/OIP3.svg";
import fourth from "../assets/OIP4.svg";
import CategoryHero from "../components/CategoryHero";

const manProducts = [
  { name: "Formal Oxford", price: 220, image: first },
  { name: "Street Sneaker", price: 180, image: second, featured: true },
  { name: "Desert Boot", price: 260, image: third },
  { name: "Slide Sandal", price: 90, image: fourth },
];

const Man = () => {
  return (
    <div
      className="relative bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${navBG})` }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="relative z-10">
        <CategoryHero
          title="BUILT DIFFERENT. STYLED SHARPER."
          tagline="Bold sneakers, formal fits, and everyday essentials for the modern man."
        />
      </div>

      <div className="xl:px-10 px-4 mt-4 xl:mr-8 pb-4 relative z-10">
        <CategoryCarousel />
      </div>

      <div className="bg-[#1E1E1E] relative z-10">
        <ProductGrid title="MEN'S COLLECTION" products={manProducts} />
      </div>
    </div>
  );
};

export default Man;
