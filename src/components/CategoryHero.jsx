import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";

const CategoryHero = ({ title, tagline }) => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  return (
    <div className="xl:px-10 px-4 pt-10 pb-6 text-center xl:text-left">
      <p className="font-title text-white font-bold xl:text-5xl text-4xl">
        {title}
      </p>
      <p
        className={`text-white/70 font-body mt-6 max-w-[420px] mx-auto xl:mx-0`}
      >
        {tagline}
      </p>
      <div className="flex flex-col xl:flex-row gap-6 mt-8 text-white py-5">
        <button
          type="button"
          disabled={!authenticated}
          title={authenticated ? "Shop now" : "Sign in to shop"}
          onClick={() => navigate("/products/1")}
          className="bg-[#D6A36A] rounded-3xl px-10 py-2 disabled:cursor-not-allowed"
        >
          SHOP NOW
        </button>
        <button className="border-white border-3 rounded-3xl px-10 py-2">
          EXPLORE
        </button>
      </div>
    </div>
  );
};

export default CategoryHero;
