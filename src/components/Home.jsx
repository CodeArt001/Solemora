import navBG from "../assets/image.svg";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./Features/CategoryCarousel";
import BestSellers from "./Features/BestSellers";
import USPStrip from "../pages/USPStrip";
import Testimonials from "../pages/Testimonials";

const Home = () => {
  return (
    <div
      className="relative bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${navBG})` }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="relative z-10 ">
        <HeroSection />
      </div>

      <div className="xl:px-10 px-4 mt-8 xl:mr-8 pb-4 relative z-10">
        <CategoryCarousel />
      </div>
      <div className="bg-[#1E1E1E] relative z-10">
        <BestSellers />
      </div>
      <USPStrip />
      <div className="relative z-10 h-16 bg-white" aria-hidden="true" />
      <Testimonials />
    </div>
  );
};

export default Home;
