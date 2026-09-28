import mensImg from "../assets/mens.avif";
// import CategoryHero from "./Features/CategoryHero";
// import CategoryCarousel from "../components/CategoryCarousel";
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
    <div>
      <section
        className="relative bg-no-repeat bg-center min-h-[420px] bg-cover"
        style={{ backgroundImage: `url(${mensImg})` }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="relative z-10 pt-10">
          <CategoryHero
            title={
              <>
                {" "}
                BUILT DIFFERENT. <br /> STYLED SHARPER.{" "}
              </>
            }
            tagline={
              <>
                {" "}
                Bold sneakers, formal fits,
                <br /> and everyday essentials for the modern man.
              </>
            }
          />
        </div>
      </section>
      <section className="bg-[#1E1E1E]">
        <ProductGrid title="MEN'S COLLECTION" products={manProducts} />
      </section>
    </div>
  );
};

export default Man;
